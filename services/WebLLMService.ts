import { CreateMLCEngine, MLCEngine, InitProgressReport, ChatCompletionMessageParam } from "@mlc-ai/web-llm";
import { content } from '../lib/content';

const SELECTED_MODEL = "Llama-3.2-1B-Instruct-q4f16_1";

export const SYSTEM_INSTRUCTION = `You are Gem, the official local AI guide for Sourabh Singh's Portfolio.
Your goal is to be helpful, witty, and engaging.

SITE CONTENT CONTEXT:
${JSON.stringify(content, null, 2)}

CONTACT INFORMATION:
- Email: sourabh3527@gmail.com
- GitHub: https://github.com/sooubh
- LinkedIn: https://linkedin.com/in/sooubh

BEHAVIOR:
- Answer questions about Sourabh and his projects using the context.
- Keep responses concise (2-3 sentences).
- Emphasize that you are running 100% locally in the user's browser using WebLLM and WebGPU!
`;

class WebLLMServiceClass {
    private engine: MLCEngine | null = null;
    private initProgressCallback: ((report: InitProgressReport) => void) | null = null;
    private isInitializing = false;

    public setProgressCallback(callback: (report: InitProgressReport) => void) {
        this.initProgressCallback = callback;
    }

    public async initEngine(progressCallback?: (report: InitProgressReport) => void): Promise<MLCEngine> {
        if (this.engine) return this.engine;
        if (this.isInitializing) {
            // Wait until initialized
            while (this.isInitializing) {
                await new Promise((resolve) => setTimeout(resolve, 500));
            }
            if (this.engine) return this.engine;
        }

        this.isInitializing = true;
        try {
            const engine = await CreateMLCEngine(SELECTED_MODEL, {
                initProgressCallback: (report) => {
                    console.log("WebLLM Init:", report.text);
                    if (progressCallback) progressCallback(report);
                    if (this.initProgressCallback) this.initProgressCallback(report);
                }
            });
            this.engine = engine;
            return engine;
        } finally {
            this.isInitializing = false;
        }
    }

    public async streamResponse(
        history: { role: 'user' | 'assistant' | 'model'; text: string }[],
        userMsg: string,
        onChunk: (text: string) => void
    ): Promise<string> {
        const engine = await this.initEngine();
        
        // Convert history format to OpenAI Chat format
        const messages: ChatCompletionMessageParam[] = [
            { role: "system", content: SYSTEM_INSTRUCTION },
            ...history.map(m => ({
                role: m.role === 'model' || m.role === 'assistant' ? 'assistant' as const : 'user' as const,
                content: m.text
            })),
            { role: "user", content: userMsg }
        ];

        const chunks = await engine.chat.completions.create({
            messages,
            stream: true,
            temperature: 0.7,
            max_tokens: 256
        });

        let fullText = "";
        for await (const chunk of chunks) {
            const token = chunk.choices[0]?.delta?.content || "";
            fullText += token;
            onChunk(fullText);
        }

        return fullText;
    }

    public isLoaded(): boolean {
        return this.engine !== null;
    }
}

export const WebLLMService = new WebLLMServiceClass();
