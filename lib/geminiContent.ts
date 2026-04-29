export const geminiContent = {
    hero: {
        title: "Google Gemini Brand Ambassador",
        subtitle: "Showcasing Gemini in the real world with demos, workshops, and builder-led stories.",
        badge: "Official Partner ID: 1175",
        highlights: [
            "Campus ambassador for Gemini tools and education",
            "Hands-on demos that turn AI into real products",
            "Mentoring student builders and developer communities",
        ],
        cta: {
            primary: { label: "Invite Me To Speak", href: "/contact" },
            secondary: { label: "View Services", href: "/services" },
        },
    },
    proof: {
        title: "Ambassador Proof",
        subtitle: "Clear signals that I actively represent and showcase Gemini.",
        items: [
            {
                title: "Program Credential",
                detail: "Official Partner ID: 1175",
                description: "Listed as an ambassador partner for Gemini initiatives and outreach.",
            },
            {
                title: "Workshops & Demos",
                detail: "AI sessions, live prompt labs",
                description: "Interactive sessions introducing Gemini capabilities and best practices.",
            },
            {
                title: "Community Reach",
                detail: "Student builders + dev circles",
                description: "Mentoring and onboarding new builders to Gemini tooling.",
            },
            {
                title: "Showcase Projects",
                detail: "Prototypes, assistants, and demos",
                description: "Real projects that demonstrate Gemini in real workflows.",
            },
        ],
    },
    video: {
        title: "Gemini Showcase Video",
        subtitle: "A short walkthrough of my Gemini projects and community sessions.",
        embedUrl: "",
        fileUrl: "",
        poster: "/assets/geminiLogo/Google Gemini Logo on White.png",
        caption: "Add your showcase link in geminiContent.ts to replace this placeholder.",
    },
    initiatives: {
        title: "Initiatives & Activities",
        subtitle: "Programs and activations designed to grow Gemini adoption.",
        items: [
            {
                title: "Gemini Demo Day",
                timeframe: "Monthly",
                description: "Live demos of Gemini prompts, agents, and multimodal workflows.",
                tags: ["Live", "Demo", "Prompting"],
            },
            {
                title: "Campus AI Clinics",
                timeframe: "Weekly",
                description: "Hands-on clinics for students to build with Gemini APIs.",
                tags: ["Workshop", "Mentorship"],
            },
            {
                title: "Student Builder Kits",
                timeframe: "Quarterly",
                description: "Starter kits and templates to ship Gemini-ready projects fast.",
                tags: ["Templates", "Acceleration"],
            },
            {
                title: "Open Source Showcases",
                timeframe: "Ongoing",
                description: "Publishing Gemini-powered prototypes and open demos.",
                tags: ["Open Source", "Community"],
            },
        ],
    },
    updates: {
        title: "Latest Updates",
        subtitle: "What is new and what is coming next.",
        items: [
            {
                title: "Gemini voice assistant demo",
                date: "2026-04-10",
                status: "Published",
                description: "Live voice interaction demo featuring Gemini audio workflows.",
            },
            {
                title: "Campus bootcamp: Gemini foundations",
                date: "2026-05-05",
                status: "Scheduled",
                description: "A full-day workshop on Gemini APIs and prompt design.",
            },
            {
                title: "Multimodal project showcase",
                date: "2026-05-18",
                status: "Planned",
                description: "Showcasing image + text experiences built with Gemini.",
            },
        ],
    },
    logos: {
        title: "Brand & Program Assets",
        subtitle: "Official Gemini and Google identity marks used in showcases.",
        items: [
            { src: "/assets/geminiLogo/Google Logo.png", alt: "Google logo" },
            { src: "/assets/geminiLogo/Google Gemini Logo on White.png", alt: "Google Gemini logo" },
            { src: "/assets/geminiLogo/Gemini Sparkle.png", alt: "Gemini sparkle" },
            { src: "/assets/geminiLogo/Logo 02.png", alt: "Gemini mark" },
            { src: "/assets/geminiLogo/Logo 03 (3).png", alt: "Gemini icon" },
            { src: "/assets/geminiLogo/Logo 04.png", alt: "Gemini brand variant" },
        ],
    },
    cta: {
        title: "Bring Gemini to your campus or community",
        subtitle: "I collaborate with student groups, clubs, and teams to deliver Gemini-powered sessions.",
        primary: { label: "Book a Session", href: "/contact" },
        secondary: { label: "Email Me", href: "mailto:sourabh3527@gmail.com" },
    },
};

export type GeminiContent = typeof geminiContent;
