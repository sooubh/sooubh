# Master Documentation Report

## 1. PROJECT OVERVIEW
- **App name:** `Sourabh Singh | Google Gemini Ambassador & Partner` (from `package.json` + `metadata.json`)
- **Purpose:** Personal/portfolio web app showcasing profile, projects, achievements, and Gemini-powered assistant experiences.
- **Target audience:** Recruiters, collaborators, students, and community members.
- **Core problem solved:** Presents professional profile + interactive AI assistant for discovery and section navigation.
- **Platforms:** Web (React + Vite), PWA metadata present.
- **Current version/release status:** `0.0.0` in `package.json` → ⚠️ likely pre-release/continuous iteration.

## 2. TECH STACK

| Category | Technology |
|---|---|
| Language | TypeScript, JSX/TSX, CSS |
| Framework | React `^19.2.3` |
| Build tool | Vite `^6.2.0` |
| Styling | Tailwind CSS `^3.4.17`, PostCSS, Autoprefixer |
| Animations | Framer Motion `^12.23.26`, GSAP `^3.14.2` |
| 3D | Three.js `^0.182.0`, `@react-three/fiber`, `@react-three/drei`, `maath` |
| Routing | `react-router-dom` `^7.10.1` (`BrowserRouter`) |
| State management | React local state/hooks + reducer; Zustand (`lib/store.ts`) |
| AI SDK | `@google/genai` `^1.34.0` |
| Voice APIs | Web Speech API (`SpeechRecognition`, `speechSynthesis`), Web Audio API |
| Backend/database | Not found in codebase |
| Auth method | Not found in codebase |
| Storage | No app data persistence layer found in this repo |
| Dev tools/build pipeline | TypeScript compiler, Vite scripts (`dev`, `build`, `preview`) |
| CI/CD | Not found in codebase (`.github` absent) |

## 3. PROJECT STRUCTURE

```text
/home/runner/work/sooubh/sooubh
├── App.tsx                         → Router root (/, /services, /contact)
├── index.tsx                       → React app bootstrap
├── index.html                      → SEO metadata + JSON-LD + root mount
├── index.css                       → Tailwind setup + base styles
├── types.ts                        → Shared interfaces + JSX Three type augmentations
├── package.json                    → Scripts, dependencies, app metadata
├── package-lock.json               → Dependency lock file
├── tsconfig.json                   → TS compiler config
├── vite.config.ts                  → Vite config, env defines, aliases
├── vite-env.d.ts                   → Vite type reference
├── tailwind.config.js              → Theme, color tokens, content globs
├── postcss.config.js               → PostCSS plugins
├── env.example                     → Environment key template
├── metadata.json                   → App metadata + mic permission declaration
├── README.md                       → Placeholder docs (minimal)
├── .gitignore                      → Ignore rules
├── lib/
│   ├── content.ts                  → Central static content object
│   └── store.ts                    → Zustand store (performance mode/current section)
├── services/
│   ├── GeminiService.ts            → Gemini text streaming + tool declaration
│   └── GeminiLiveService.ts        → Gemini live audio session management
├── hooks/
│   ├── useGeminiLive.ts            → Alt direct WebSocket Gemini live hook (unused)
│   ├── useTextToSpeech.ts          → Browser TTS wrapper
│   └── useVoiceInput.ts            → Browser speech recognition wrapper
├── utils/
│   ├── audioRecorder.ts            → Mic capture + PCM conversion
│   └── audioStreamPlayer.ts        → PCM playback queue
├── components/
│   ├── GeminiOrb.tsx               → Main animated 3D orb background object
│   ├── chat/
│   │   └── GeminiAssistant.tsx     → Alternate chat assistant UI (unused)
│   ├── pages/
│   │   ├── Home.tsx                → Main landing composition
│   │   ├── Services.tsx            → AI prompt playground page
│   │   └── ContactPage.tsx         → Full contact experience page
│   ├── sections/
│   │   ├── Hero.tsx                → Intro hero
│   │   ├── Story.tsx               → Timeline
│   │   ├── Objectives.tsx          → Mission/metrics
│   │   ├── Universe.tsx            → Skills galaxy/list view
│   │   ├── RealProjects.tsx        → Project showcase
│   │   ├── Achievements.tsx        → Achievement grid
│   │   ├── Building.tsx            → Blog/lab section
│   │   ├── Contact.tsx             → Contact section
│   │   ├── AboutMe.tsx             → Legacy section (unused)
│   │   ├── Ambassador.tsx          → Legacy section (unused)
│   │   ├── Footer.tsx              → Legacy footer (unused)
│   │   ├── FooterCTA.tsx           → Legacy CTA (unused)
│   │   ├── StoryMode.tsx           → Legacy feature storytelling (unused)
│   │   ├── StudentOffer.tsx        → Legacy offer section (unused)
│   │   ├── WhatIsGemini.tsx        → Legacy explainer section (unused)
│   │   └── WhyDifferent.tsx        → Legacy feature cards (unused)
│   ├── three/
│   │   ├── GalaxyScene.tsx         → Alternate 3D scene shell (unused)
│   │   ├── Planet.tsx              → 3D planet component (unused)
│   │   └── Starfield.tsx           → 3D starfield component (unused)
│   └── ui/
│       ├── ChatBot.tsx             → Main floating AI assistant (active)
│       ├── AIAssistant.tsx         → Alternate draggable assistant (unused)
│       ├── AnimatedBackground.tsx  → Chat animated background
│       ├── ChatParticles.tsx       → Chat particle effect
│       ├── VoiceVisualizer.tsx     → Voice bars visualization
│       ├── FloatingNavbar.tsx      → Desktop section navigation
│       ├── MobileMenu.tsx          → Mobile overlay navigation
│       ├── HeaderLogo.tsx          → Fixed top-left logo nav
│       ├── Footer.tsx              → Active footer
│       ├── Particles.tsx           → Ambient particles
│       ├── Preloader.tsx           → Startup typing preloader
│       ├── ComingSoonModal.tsx     → Generic modal for placeholder links
│       ├── SectionReveal.tsx       → Scroll reveal wrapper
│       └── Toggle.tsx              → Generic toggle (unused)
└── public/
    ├── favicon.svg                 → Favicon
    ├── robots.txt                  → Robots policy
    ├── sitemap.xml                 → Sitemap
    ├── site.webmanifest            → PWA manifest
    ├── assets/                     → Static images
    │   ├── hero1.webp
    │   ├── profile-ambassador.png
    │   ├── sitrc-logo.png
    │   └── Picsart_26-03-26_23-20-08-283.png
    └── mobileapps/gullycricket/
        ├── index.html              → External app landing page
        └── privacy-policy.html     → Privacy policy for Gully Cricket app
```

## 4. ARCHITECTURE DIAGRAM (Text-Based)

```text
[User]
  ↓
[React UI: pages + sections + ui components]
  ↓
[Routing Layer: BrowserRouter + Routes]
  ├─ "/" -> Home
  ├─ "/services" -> Services
  └─ "/contact" -> ContactPage
  ↓
[State Layer]
  ├─ React useState/useReducer (ChatBot, pages, sections)
  ├─ Custom hooks (voice input, TTS)
  └─ Zustand store (defined, minimally integrated)
  ↓
[Service Layer]
  ├─ GeminiService (text stream + function tool call schema)
  └─ GeminiLiveService (live audio websocket session via SDK)
  ↓
[External Systems]
  ├─ Google Gemini API (@google/genai)
  ├─ Browser SpeechRecognition API
  ├─ Browser SpeechSynthesis API
  ├─ Browser Audio APIs (MediaDevices/WebAudio)
  ├─ Google Forms link (CTA)
  └─ External static resources (Wikimedia/Unsplash links in legacy components)
```

## 5. FEATURE BREAKDOWN

### Feature: Portfolio Landing Experience
- **What it does:** Multi-section personal site with animated visuals.
- **Entry screen/file:** `/home/runner/work/sooubh/sooubh/components/pages/Home.tsx`
- **Data flow:** Scroll/nav click → section IDs (`section-s...`) → DOM scroll.
- **Key files involved:** `Home.tsx`, section files, `FloatingNavbar.tsx`, `MobileMenu.tsx`, `GeminiOrb.tsx`.
- **State managed:** `isLoading`, `isMobile`, active section, menu open state.
- **Edge cases handled:** Mobile reduced rendering load; route state-based scroll after cross-page nav.

### Feature: AI Chat Assistant (Primary)
- **What it does:** Floating chat with Gemini text responses, optional voice I/O, optional live mode.
- **Entry screen/file:** `/home/runner/work/sooubh/sooubh/components/ui/ChatBot.tsx`
- **Data flow:** User message → reducer state → `GeminiService.streamResponse` → stream chunks → UI updates (+ optional section scroll from function call).
- **Key files involved:** `ChatBot.tsx`, `GeminiService.ts`, `GeminiLiveService.ts`, `useVoiceInput.ts`, `useTextToSpeech.ts`.
- **State managed:** Open/close, messages, input, loading, errors, voice mode/live mode flags.
- **Edge cases handled:** Handles stream errors; handles live reconnect failures; guards blank input.

### Feature: AI Services Playground
- **What it does:** Prompt box with model fallback logic.
- **Entry screen/file:** `/home/runner/work/sooubh/sooubh/components/pages/Services.tsx`
- **Data flow:** Prompt submit → Gemini 1.5 Pro → fallback Gemini 1.5 Flash on failure → response text render.
- **Key files involved:** `Services.tsx`, `@google/genai` usage.
- **State managed:** `prompt`, `response`, `loading`, `modelUsed`.
- **Edge cases handled:** Missing API key message; fallback on model errors.

### Feature: Contact Flows
- **What it does:** Dedicated contact page + embedded home contact section.
- **Entry screen/file:** `/home/runner/work/sooubh/sooubh/components/pages/ContactPage.tsx`, `/home/runner/work/sooubh/sooubh/components/sections/Contact.tsx`
- **Data flow:** Form submit (mock timeout only) → success state.
- **Key files involved:** Contact page/section components.
- **State managed:** Form state, FAQ expand state, clipboard copied state.
- **Edge cases handled:** No backend submission (simulated only) ⚠️.

### Feature: 3D Visual Background / Skills Universe
- **What it does:** Immersive orbital visuals + skill cards/list.
- **Entry screen/file:** `/home/runner/work/sooubh/sooubh/components/GeminiOrb.tsx`, `/home/runner/work/sooubh/sooubh/components/sections/Universe.tsx`
- **Data flow:** Scroll/mouse move → Three.js motion transforms.
- **Key files involved:** `GeminiOrb.tsx`, `Universe.tsx`.
- **State managed:** hovered skill, view mode, core hover.
- **Edge cases handled:** Mobile fallback list + reduced 3D particle counts.

## 6. DATA MODELS

### Model: ChatMessage
| Field | Type | Description |
|---|---|---|
| role | `'user' \| 'model' \| 'assistant'` | Speaker role |
| text | `string` | Message text |

### Model: Feature
| Field | Type | Description |
|---|---|---|
| id | `string` | Feature identifier |
| title | `string` | Feature title |
| description | `string` | Feature body |
| icon | `React.ReactNode` | UI icon |
| bgGradient | `string` | Gradient class |

### Model: CarouselItem
| Field | Type | Description |
|---|---|---|
| id | `string` | Item ID |
| title | `string` | Name/title |
| role | `string` | Role label |
| description | `string` | Text |
| image | `string` | Image URL/path |

### Model: GalaxyState
| Field | Type | Description |
|---|---|---|
| performanceMode | `boolean` | 3D/2D mode toggle flag |
| togglePerformanceMode | `() => void` | Toggles performance mode |
| currentSection | `string` | Current section ID |
| setSection | `(section: string) => void` | Setter |

- **Firestore collection path:** Not found in codebase.

## 7. API & SERVICE LAYER

### Service: GeminiService
- **Purpose:** Text-stream responses with system prompt and callable tool definition.
- **Methods:** `streamResponse(history: ChatMessage[], userMsg: string)`
- **External API/DB it calls:** Gemini model `models/gemini-2.0-flash-exp`
- **Error handling approach:** try/catch with console logging and generic throw.

### Service: GeminiLiveService
- **Purpose:** Live bidirectional audio conversation session.
- **Methods:** `startSession`, `playAudio`, `stopSession` (+ internal setup/cleanup helpers)
- **External API/DB it calls:** Gemini live connect with `models/gemini-2.5-flash-native-audio-preview-12-2025`
- **Error handling approach:** callback error propagation + cleanup on close.

### Hook-level service wrappers
- `useVoiceInput.ts` → browser speech recognition lifecycle.
- `useTextToSpeech.ts` → browser speech synthesis wrapper.
- `useGeminiLive.ts` → raw WebSocket implementation (appears unused).

## 8. NAVIGATION & ROUTING
- **Router type used:** `BrowserRouter` + `Routes` + `Route`.
- **Full route map:**
  - `/` → `Home`
  - `/services` → `Services`
  - `/contact` → `ContactPage`
- **Auth guards / redirect logic:** Not found in codebase.
- **Deep link support:** Route deep links supported at app level; host rewrite config not found ⚠️.

## 9. STATE MANAGEMENT MAP

| Provider/State holder | What state it holds | Which screens consume it | Side effects it triggers |
|---|---|---|---|
| `chatReducer` in `ChatBot` | chat window state, messages, voice/live flags | `ChatBot` | API calls, live session connect/disconnect, TTS |
| `useVoiceInput` | listening flag, transcript, errors | `ChatBot` | mic + speech recognition |
| `useTextToSpeech` | speaking state, support flag | `ChatBot` | speech synthesis playback |
| `useState` in `Home` | loading/mobile flags | `Home` | preloader and responsive rendering |
| `useState` in `Services` | prompt/response/loading/model | `Services` | Gemini request/fallback |
| `useState` in contact/forms | local UI submit/copy states | `Contact`, `ContactPage` | simulated send, clipboard |
| Zustand `useGalaxyStore` | performance mode + section | ⚠️ No clear active consumption found | none in runtime flow |

## 10. DESIGN SYSTEM
- **Color palette:**
  - Primary blue `#4285F4`
  - Red `#DB4437`
  - Yellow `#F4B400`
  - Green `#0F9D58`
  - Dark `#202124`
  - Gray `#5f6368`
  - Gemini deep `#1c1c3a`, purple `#8e94f2`, blue `#4E75F6`
- **Typography:** `Google Sans`, `Inter`, `JetBrains Mono`
- **Spacing system:** Tailwind utility spacing (no separate token file found).
- **Component library:** Reusable components in `/home/runner/work/sooubh/sooubh/components/ui`.
- **Theme mode support:** Light/dark switch not found (dark-first design).
- **Design inconsistencies found:**
  - ⚠️ Duplicate footer implementations (`sections/Footer.tsx` vs `ui/Footer.tsx`)
  - ⚠️ Multiple assistant implementations (`ChatBot`, `AIAssistant`, `GeminiAssistant`)
  - ⚠️ Placeholder links (`#`) and mock interactions
  - ⚠️ Mixed social URLs for LinkedIn handle variants

## 11. THIRD-PARTY INTEGRATIONS

| Integration | Purpose | Config location | Auth method |
|---|---|---|---|
| Google Gemini API (`@google/genai`) | AI chat/text/live audio | `services/GeminiService.ts`, `services/GeminiLiveService.ts`, `components/pages/Services.tsx` | API key (`VITE_GEMINI_API_KEY`) |
| Web SpeechRecognition API | Voice-to-text input | `hooks/useVoiceInput.ts` | Browser mic permission |
| Web SpeechSynthesis API | Text-to-speech output | `hooks/useTextToSpeech.ts` | Browser capability |
| Web Audio + MediaDevices | PCM capture/playback for live audio | `GeminiLiveService.ts`, `utils/audioRecorder.ts`, `utils/audioStreamPlayer.ts` | Browser mic permission |
| React Three Fiber + Drei + Three | 3D visuals/orb/stars | `GeminiOrb.tsx`, `components/three/*` | N/A |
| Google Forms | External contact/CTA | hardcoded links in content/sections | Public form URL |

## 12. ENVIRONMENT & CONFIG
- **Environment variables/config keys used:**
  - `VITE_GEMINI_API_KEY` (`env.example`)
  - `vite.config.ts` maps `GEMINI_API_KEY` to `process.env.API_KEY` + `process.env.GEMINI_API_KEY` ⚠️ naming mismatch risk.
- **Where set:** Local `.env` (expected) and Vite runtime env.
- **Sensitive keys:** Gemini API key is sensitive 🔴.
- **Security note:** Client-side key exposure exists by design 🔴.

## 13. BUILD & DEPLOYMENT
- **How to run locally:**

```bash
cd /home/runner/work/sooubh/sooubh
npm install
cp /home/runner/work/sooubh/sooubh/env.example /home/runner/work/sooubh/sooubh/.env
# set VITE_GEMINI_API_KEY in .env
npm run dev
```

- **How to build for release:**

```bash
cd /home/runner/work/sooubh/sooubh
npm run build
npm run preview
```

- **Signing setup:** Not found in codebase.
- **Deployment targets:** Static web hosting implied (`https://sooubh.site`).
- **CI/CD pipeline:** Not found in codebase.

## 14. KNOWN ISSUES & TECHNICAL DEBT
- **TODO/FIXME comments:** Not found in codebase.
- **Hardcoded values:** many dates/stats/IDs/model names/social links in UI.
- **Missing error handling:** contact forms are simulated and do not submit.
- **Performance risks:** heavy animations/3D; `window.innerWidth` usage in render paths.
- **Security risks:**
  - 🔴 Exposed client-side Gemini API key.
  - 🔴 No backend proxy/rate limiting for AI endpoints.
- **Dead/unused files/components (likely):**
  - `components/sections/AboutMe.tsx`
  - `components/sections/Ambassador.tsx`
  - `components/sections/Footer.tsx`
  - `components/sections/FooterCTA.tsx`
  - `components/sections/StoryMode.tsx`
  - `components/sections/StudentOffer.tsx`
  - `components/sections/WhatIsGemini.tsx`
  - `components/sections/WhyDifferent.tsx`
  - `components/three/*`
  - `components/ui/AIAssistant.tsx`
  - `components/chat/GeminiAssistant.tsx`
  - `hooks/useGeminiLive.ts`
  - `components/ui/Toggle.tsx`
  - `lib/store.ts` (appears minimally/unused in active flow)
- **Other inconsistencies:**
  - ⚠️ Tailwind content includes `./src/**/*` but project has no `src/`.
  - ⚠️ `AboutMe.tsx` imports `../../assets/profile-ambassador.png`, but assets are in `/public/assets`.

## 15. ONBOARDING GUIDE (For a new developer)
1. Clone the repo.
2. Install dependencies.
3. Setup Gemini env key.
4. Run the app.
5. Read code in this order for fast understanding.

```bash
git clone <repo-url>
cd /home/runner/work/sooubh/sooubh
npm install
cp /home/runner/work/sooubh/sooubh/env.example /home/runner/work/sooubh/sooubh/.env
# add VITE_GEMINI_API_KEY
npm run dev
```

```text
Read order:
1) /home/runner/work/sooubh/sooubh/package.json
2) /home/runner/work/sooubh/sooubh/App.tsx and /home/runner/work/sooubh/sooubh/index.tsx
3) /home/runner/work/sooubh/sooubh/components/pages/Home.tsx
4) /home/runner/work/sooubh/sooubh/components/ui/ChatBot.tsx
5) /home/runner/work/sooubh/sooubh/services/GeminiService.ts and GeminiLiveService.ts
6) Active sections in /home/runner/work/sooubh/sooubh/components/sections
7) /home/runner/work/sooubh/sooubh/components/pages/Services.tsx and ContactPage.tsx
8) /home/runner/work/sooubh/sooubh/tailwind.config.js and /home/runner/work/sooubh/sooubh/index.css
```

## 16. EXECUTIVE SUMMARY
1. This is a React + Vite personal portfolio focused on AI branding and interactive experience.  
2. It is web-first, dark-themed, animation-heavy, and includes Gemini-powered assistants.  
3. Strongest part: rich UI composition with modern animation/3D tooling. ✅  
4. Gemini integration spans text streaming, tool calls, and live audio path. ✅  
5. The codebase contains multiple legacy/parallel implementations for similar features. ⚠️  
6. Documentation and CI/CD are minimal or absent. ⚠️  
7. No backend/database is present in this repo; AI calls are client-side.  
8. Biggest risk: exposed client API key and lack of server-side control. 🔴  
9. Top improvements: consolidate duplicates, add secure backend proxy for AI, add CI/lint/test pipeline.  
10. Next step: define active architecture and archive/remove unused modules for maintainability.
