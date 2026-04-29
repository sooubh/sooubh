import {
    GoogleGenAI,
    Type,
    Content,
    FunctionDeclaration,
    Tool,
    ThinkingLevel
} from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY!;
const ai = new GoogleGenAI({ apiKey });

import { content } from '../lib/content';

export const SYSTEM_INSTRUCTION = `You are Gem, the official AI guide for Sourabh Singh's Google Ambassador Portfolio.
Your goal is to be helpful, witty, and engaging.

SITE CONTENT CONTEXT:
${JSON.stringify(content, null, 2)}

NAVIGATION MAP:
Available sections you can navigate to:
- hero: Main landing section (Top)
- section-s: 'Story' - Sourabh's Journey & Education
- section-o: 'Objectives' - Mission & Goals
- section-u: 'Universe' - Technical Galaxy & Skills
- section-r: 'Real Projects' - Portfolio Work
- section-a: 'Achievements' - Awards & Recognition
- section-b: 'Building' - Blogs & Experiments
- section-h: 'Human Connect' - Contact Section

CONTACT INFORMATION:
Sourabh's contact details for better connectivity:
- Email: sourabh3527@gmail.com
- GitHub: https://github.com/sooubh
- LinkedIn: https://linkedin.com/in/sooubh
- Instagram: https://instagram.com/sourabh_singg
- Twitter: https://twitter.com/sourabh_singgh

BEHAVIOR:
- If a user asks to navigate, go to, or look at a section, ALWAYS use the 'scrollToSection' tool with the correct ID from the map above.
- Example: "Show projects" -> scrollToSection(section-r), "Go to skills" -> scrollToSection(section-u)
- When users ask about contacting, connecting with, or reaching out to Sourabh, provide the contact information above.
- You can also navigate them to the contact section (section-h) using the scrollToSection tool.
- Use the provided SITE CONTENT CONTEXT to answer questions about Sourabh and the program.
- Keep responses concise (2-3 sentences).
- Be enthusiastic about AI, Google, and learning!
- After navigating, mention what section they're viewing.
`;

// ---------------- SYSTEM INSTRUCTION ----------------
const systemInstruction: Content = {
    role: "system",
    parts: [{ text: SYSTEM_INSTRUCTION }]
};

// ---------------- TOOL ----------------
const scrollToSectionTool: FunctionDeclaration = {
    name: "scrollToSection",
    description: "Scrolls the page to a specific section",
    parameters: {
        type: Type.OBJECT,
        properties: {
            sectionId: {
                type: Type.STRING,
                description: "The section to scroll to. Valid options: hero, section-s, section-o, section-u, section-r, section-a, section-b, section-h"
            }
        },
        required: ["sectionId"]
    }
};

export const TOOLS: Tool[] = [
    { functionDeclarations: [scrollToSectionTool] }
];

// ---------------- TYPES ----------------
import { ChatMessage } from "../types";

// ---------------- SERVICE ----------------
export const GeminiService = {
    async streamResponse(history: ChatMessage[], userMsg: string) {
        // Construct content from history and new user message
        const contents: Content[] = [
            ...history.map(m => ({
                role: m.role === 'assistant' ? 'model' : m.role,
                parts: [{ text: m.text }]
            })),
            {
                role: "user",
                parts: [{ text: userMsg }]
            }
        ];

        try {
            const streamResult = await ai.models.generateContentStream({
                model: "gemini-3-flash-preview",
                contents,
                config: {
                    thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
                    systemInstruction: systemInstruction,
                    tools: TOOLS,
                    responseModalities: ["TEXT"],
                    candidateCount: 1,
                    temperature: 0.7,
                }
            });

            return streamResult;

        } catch (error) {
            console.error("GeminiService: Error starting stream", error);
            throw new Error("Failed to connect to AI service.");
        }
    }
};
