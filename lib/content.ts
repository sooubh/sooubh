export const content = {
    hero: {
        title: "Sourabh Singh",
        tagline: "AI Builder • Computer Engineering Student • AI & Web Innovator",
        badge: "Official Partner ID: 12115",
        buttons: [
            { text: "Explore My Universe", action: "explore" },
            { text: "Fill Form", action: "form", link: "https://docs.google.com/forms/d/e/1FAIpQLSffT05FZXoT9BcOBtuVRDPpMu_P9CYOFOZASqmUAnkOQHkS4A/viewform" }
        ]
    },
    about: {
        title: "About Me",
        bio: "I am a Computer Engineering undergraduate with a strong interest in Artificial Intelligence and modern web development. I enjoy building user-centric, high-performance applications and learning through hands-on projects, hackathons, and experimentation. As an AI Builder, I empower students to leverage modern AI tools to boost their productivity and creativity.",
        highlights: [
            "Represent modern technologies on campus",
            "Promote AI and developer tools",
            "Conduct tech sessions and mentor students"
        ],
        skills: ["React", "Three.js", "TypeScript", "Cloud", "AI Assistant", "Tailwind CSS"]
    },
    projects: [
        {
            id: "project-1",
            title: "AI Integration",
            description: "A deep integration of AI into web applications, enabling voice interaction and multimodal capabilities.",
            tech: ["AI API", "React", "WebSocket"],
            link: "#"
        },
        {
            id: "project-2",
            title: "AI Voice Assistant",
            description: "Real-time voice-to-text and text-to-speech assistant using modern browser APIs and AI inference.",
            tech: ["Web Speech API", "OpenAI/AI", "React"],
            link: "#"
        },
        {
            id: "project-3",
            title: "3D Portfolio",
            description: "An immersive 3D portfolio website built with React Three Fiber, featuring scroll-driven animations and interactive elements.",
            tech: ["R3F", "Three.js", "GSAP"],
            link: "#"
        }
    ],
    contact: {
        title: "Contact",
        text: "Ready to collaborate or have questions about the AI ambassador program?",
        email: "sourabh3527@gmail.com",
        github: "https://github.com/sooubh",
        linkedin: "https://linkedin.com/in/sooubh",
        instagram: "https://instagram.com/sourabh_singg",
        twitter: "https://twitter.com/sourabh_singgh",
        formLink: "https://docs.google.com/forms/d/e/1FAIpQLSffT05FZXoT9BcOBtuVRDPpMu_P9CYOFOZASqmUAnkOQHkS4A/viewform"
    }
};

export type Content = typeof content;
