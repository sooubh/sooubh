export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  type: 'blog' | 'vlog';
  coverImage: string;
  videoUrl?: string; // For vlogs
}

export const blogData: BlogPost[] = [
  {
    id: 'agentic-workflows-gemini',
    title: 'The Future of Agentic Workflows with Gemini 2.5',
    excerpt: 'Exploring how autonomous agents are reshaping software development and meaningful automation.',
    date: 'Dec 15, 2024',
    readTime: '8 min read',
    tags: ['AI', 'Agents', 'Google Gemini'],
    type: 'blog',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    content: `
# The Future of Agentic Workflows with Gemini 2.5

Software engineering is undergoing a paradigm shift. We are moving from tools that assist developers to agents that collaborate with them. With the release of Gemini 2.5, the potential for autonomous agentic workflows has reached an all-time high.

## What are Agentic Workflows?
Unlike traditional AI chat interactions, agentic workflows involve "loops" where the AI can think, use tools, observe the results, and refine its approach. It's not about a single prompt; it's about a persistent objective.

### Key Capabilities of Gemini 2.5 for Agents:
1. **Massive Context Window**: Handling entire codebases as context.
2. **Native Multimodality**: Understanding UI mockups and code simultaneously.
3. **Advanced Tool Use**: Seamless integration with APIs and terminal environments.

## The Role of the Human
In an agent-driven world, the human developer becomes an architect. We define the constraints, the security policies, and the ultimate vision, while the agents handle the boilerplate, the unit tests, and the initial refactoring passes.

Stay tuned for more updates on how I am integrating Gemini agents into my daily workflow!
    `
  },
  {
    id: 'scaling-websockets-node',
    title: 'Scaling Real-time Systems to 10k+ Concurrent Users',
    excerpt: 'Lessons learned from scaling WebSocket connections on a single Node.js node using Redis and optimized buffering.',
    date: 'Nov 28, 2024',
    readTime: '10 min read',
    tags: ['Node.js', 'System Design', 'WebSockets'],
    type: 'blog',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200',
    content: `
# Scaling Real-time Systems to 10k+ Concurrent Users

When building a real-time collaborative platform, the first bottleneck you hit is the sheer number of concurrent TCP connections. Here's how I managed to scale a single Node.js instance to handle over 10,000 active WebSocket users.

## 1. Memory Management
Each socket connection consumes memory. By default, Node.js and the 'ws' library are efficient, but you must tune your buffers. I implemented custom message batching to reduce the overhead of small, frequent packets.

## 2. The Redis Pub/Sub Pattern
To scale beyond a single process (using Node Cluster), you need a way for processes to communicate. Redis Pub/Sub is the industry standard here. Every message sent to a "room" is published to Redis, and all listening workers broadcast it to their local connected clients.

## 3. Load Balancing
Using Nginx as a reverse proxy with sticky sessions is crucial. WebSockets start as an HTTP request, so the load balancer must ensure the upgrade request hits the right instance.

Scaling is a journey, not a destination. My next goal? 100k users.
    `
  },
  {
    id: 'vlog-ai-setup-2024',
    title: 'Vlog: My 2024 AI Development Setup',
    excerpt: 'A deep dive into the hardware and software I use to build and train local LLMs and agentic systems.',
    date: 'Nov 10, 2024',
    readTime: '6 min watch',
    tags: ['Vlog', 'Setup', 'Hardware'],
    type: 'vlog',
    coverImage: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=1200',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    content: `
# Vlog: My 2024 AI Development Setup

In this vlog, I take you through my workstation where I spend 12 hours a day building the future. 

## The Hardware
- **CPU**: AMD Ryzen 9 7950X (16 Cores of raw power)
- **GPU**: 2x NVIDIA RTX 4090 (Necessary for local LLM inference and fine-tuning)
- **RAM**: 128GB DDR5
- **Monitor**: 49" Ultrawide for massive context mapping.

## The Software
- **OS**: Arch Linux (The ultimate control)
- **Editor**: Neovim with custom AI completions
- **Terminal**: Alacritty + Tmux
- **AI Stack**: Ollama, LocalAI, and the Google Cloud SDK for Gemini integration.

Check out the full video above to see how I've optimized my environment for maximum flow state!
    `
  },
  {
    id: 'optimizing-rag-pipelines',
    title: 'Precision RAG: Beyond Simple Vector Search',
    excerpt: 'How semantic reranking and hybrid search can significantly improve the accuracy of your RAG pipelines.',
    date: 'Oct 20, 2024',
    readTime: '7 min read',
    tags: ['AI', 'Search', 'RAG'],
    type: 'blog',
    coverImage: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=1200',
    content: `
# Precision RAG: Beyond Simple Vector Search

Retrieval-Augmented Generation (RAG) is the backbone of most enterprise AI today. But "simple" vector search often falls short of the precision required for complex technical queries.

## The Problem with Vector-Only Search
Vector embeddings are great at finding "similar" themes, but they often miss specific keywords or exact technical identifiers.

## The Solution: Hybrid Search
By combining **BM25 (Keyword search)** with **Dense Vector Search**, we get the best of both worlds. 

### My Optimized Workflow:
1. **Hybrid Retrieval**: Fetch top 50 candidates from both keyword and vector stores.
2. **Semantic Reranking**: Use a Cross-Encoder model to re-evaluate the relevance of the candidates against the prompt.
3. **Context Filtering**: Only pass the top 3 most relevant snippets to the LLM.

The result? A 40% reduction in hallucinations in my testing.
    `
  },
  {
    id: 'vlog-google-ambassador-day',
    title: 'Vlog: A Day as a Google Student Ambassador',
    excerpt: 'Behind the scenes of organizing workshops, building community, and representing Google on campus.',
    date: 'Sept 15, 2024',
    readTime: '5 min watch',
    tags: ['Vlog', 'Google', 'Community'],
    type: 'vlog',
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    content: `
# Vlog: A Day as a Google Student Ambassador

What does it actually mean to be a Google Student Ambassador? It's more than just cool swags (though those are nice). 

## Morning: Content Prep
I start my day by reviewing the latest Google Cloud or Gemini API updates to prepare for the evening workshop.

## Afternoon: Community Building
Meeting with student leads, planning our next "Build with AI" hackathon, and helping juniors debug their first Cloud Run deployments.

## Evening: The Workshop
Tonight we focused on Gemini Live and Multimodal interactions. Seeing students' faces light up when their code works is the best part of the job.

Being an ambassador is about empowering others with the same tools that inspired me. Watch the full vlog to see the chaos and the fun!
    `
  },
  {
    id: 'vlog-hackathon-survival',
    title: 'Vlog: 48 Hours in an AI Hackathon',
    excerpt: 'From zero to prototype: Follow my journey through a high-stakes AI hackathon where we built a real-time sign language translator.',
    date: 'Aug 28, 2024',
    readTime: '12 min watch',
    tags: ['Vlog', 'Hackathon', 'Computer Vision'],
    type: 'vlog',
    coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    content: `
# Vlog: 48 Hours in an AI Hackathon

Sleep is optional, but innovation is mandatory. This vlog captures the raw, unfiltered experience of competing in the National AI Challenge.

## Hour 1-12: The Pivot
We started with a simple chatbot idea, but realized the world needs something more accessible. We pivoted to a real-time sign language to speech translator using MediaPipe and Gemini.

## Hour 13-36: The Grind
Debugging late into the night, optimizing our frame-rate for mobile deployment, and drinking far too much caffeine.

## Hour 48: The Pitch
The moment of truth. Presenting to the judges and seeing our model perform perfectly in real-time. 

Hackathons aren't just about winning; they're about pushing your limits. Check out the vlog for the full journey!
    `
  },
  {
    id: 'vlog-open-source-journey',
    title: 'Vlog: My First Major Open Source Contribution',
    excerpt: 'Sharing the story of how I contributed to a major LLM framework and what I learned about collaborative engineering.',
    date: 'July 10, 2024',
    readTime: '8 min watch',
    tags: ['Vlog', 'Open Source', 'GitHub'],
    type: 'vlog',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    content: `
# Vlog: My First Major Open Source Contribution

Contributing to open source can be intimidating. In this vlog, I share how I went from "scared to open a PR" to "core contributor" on a popular AI library.

## Finding the Issue
I talk about how I found a bug in the vector database connector and decided to fix it instead of just reporting it.

## The Review Process
Wait, why did they request 15 changes? I share my experience with rigorous code reviews and how they made me a better engineer.

## The Merge
That green button is a great feeling. But the real reward was the community I found along the way.

If you're thinking about starting your open source journey, this vlog is for you!
    `
  },
  {
    id: 'vlog-future-of-dev',
    title: 'Vlog: Will AI Replace Software Engineers?',
    excerpt: 'My take on the future of our profession in the age of generative AI and autonomous agents.',
    date: 'June 05, 2024',
    readTime: '15 min watch',
    tags: ['Vlog', 'AI', 'Career'],
    type: 'vlog',
    coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    content: `
# Vlog: Will AI Replace Software Engineers?

The question everyone is asking. In this deep dive, I look at the data, the trends, and my own experience building AI tools.

## The Automation of Code
Yes, AI is getting incredibly good at writing boilerplate, refactoring, and even solving LeetCode hards. But that's only 20% of the job.

## The Rise of the AI Architect
The role of the engineer is shifting from "coder" to "orchestrator." We are now architects of complex systems that leverage AI as a component.

## Why I'm Optimistic
AI is a force multiplier. It allows one engineer to do the work of ten, enabling us to tackle bigger, more ambitious problems than ever before.

Don't fear the machine; learn to build it. Watch the vlog for my full analysis.
    `
  }
];
