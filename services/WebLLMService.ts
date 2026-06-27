import { CreateMLCEngine, MLCEngine, InitProgressReport, ChatCompletionMessageParam } from "@mlc-ai/web-llm";
import { content } from '../lib/content';

const DESKTOP_MODEL = "Llama-3.2-1B-Instruct-q4f16_1-MLC";
const MOBILE_MODEL = "Qwen2.5-0.5B-Instruct-q4f16_1-MLC";

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

    private getModelId(): string {
        if (typeof window !== 'undefined') {
            const isMobile = window.innerWidth < 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent);
            if (isMobile) {
                console.log("WebLLM: Mobile device detected. Loading lightweight model:", MOBILE_MODEL);
                return MOBILE_MODEL;
            }
        }
        return DESKTOP_MODEL;
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
            const modelId = this.getModelId();
            const hasWebGPU = typeof navigator !== 'undefined' && 'gpu' in navigator;

            const engine = await CreateMLCEngine(modelId, {
                initProgressCallback: (report) => {
                    let text = report.text;
                    if (!hasWebGPU) {
                        text = `[Running on CPU - WebGPU not supported/enabled] ${text}`;
                    } else if (modelId === MOBILE_MODEL) {
                        text = `[Lightweight Mobile Mode] ${text}`;
                    }
                    console.log("WebLLM Init:", text);

                    const enrichedReport = { ...report, text };
                    if (progressCallback) progressCallback(enrichedReport);
                    if (this.initProgressCallback) this.initProgressCallback(enrichedReport);
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
