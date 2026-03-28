<<<<<<< HEAD
# The Citadel — React Component Architecture

India's Education Portal & College Roadmap, refactored from a single HTML file into a clean React component tree.

## Quick Start

```bash
cd citadel
npm install
npm run dev
```

Then open `http://localhost:5173`

**Demo login:** `demo@test.com` / `demo123`

---

## Project Structure

```
citadel/
├── index.html                        # Vite entry HTML
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                      # React root render
    ├── styles/
    │   └── globals.css               # All CSS: variables, themes, animations,
    │                                 # components, responsive breakpoints
    ├── data/
    │   └── index.js                  # Stream data, state counselling data,
    │                                 # demo users, API keys, AI system prompt
    ├── hooks/
    │   ├── useTheme.js               # Dark/light theme toggle + localStorage
    │   ├── useAIChat.js              # Groq streaming chat logic
    │   ├── useScrollEffects.js       # Reveal-on-scroll, counter animation,
    │   │                             # nav highlight, parallax, tilt
    │   └── useToast.js               # Toast notifications + scrollToSection
    └── components/
        ├── App.jsx                   # Root — auth gate, modal state,
        │                             # AI query routing, layout
        ├── PortalBar.jsx             # Fixed top education portal banner
        ├── PageTransition.jsx        # Full-screen wipe transition overlay
        ├── DoodleCanvas.jsx          # Floating math symbols background
        ├── AuthScreen.jsx            # Sign in + sign up panels with animation
        ├── Nav.jsx                   # Navbar + hamburger + mobile menu
        ├── HeroSection.jsx           # Hero with stats, CTAs, floating badges
        ├── MarqueeBand.jsx           # Scrolling text marquee (used twice)
        ├── StreamsSection.jsx        # 4 stream cards grid
        ├── StepsSection.jsx          # "How It Works" 4-step cards
        ├── CounsellingSection.jsx    # Tabbed counselling guide
        │                             # (Engineering / Medical / Law /
        │                             #  Design / Commerce / State)
        ├── StateCounsellingPanel.jsx # 19-state grid with search + filter
        ├── DetailCard.jsx            # Reusable DetailCard, StratBox, DSection
        ├── PCMSection.jsx            # PCM stream detail section
        ├── PCBSection.jsx            # PCB stream detail section
        ├── StreamDetailSections.jsx  # Commerce + Humanities sections
        ├── AISection.jsx             # Groq AI chat interface
        ├── Modal.jsx                 # Stream detail modal (bottom sheet on mobile)
        └── CTASection.jsx            # CTA section + Footer
```

---

## Data Flow

```
App.jsx
  ├── useTheme()           → theme prop to Nav
  ├── handleAskAI()        → sets pendingQuery → AISection
  ├── setModalKey()        → opens Modal with stream key
  └── onSignOut()          → reloads page

AuthScreen
  └── onAuthenticated()    → sets authed=true in App

Modal
  └── onAskAI()            → routes through App.handleAskAI
```

---

## Key Design Decisions

- **Single CSS file** (`globals.css`) — all CSS variables, dark/light themes, animations, and responsive rules live here. No CSS modules or styled-components, matching the original HTML approach.
- **`data/index.js`** — all content (stream data, state data, AI prompts, credentials) is co-located, making it easy to update without touching components.
- **Custom hooks** — scroll effects, AI chat, and theme are extracted into hooks so components stay focused on rendering.
- **`pendingQuery` pattern** — when any "Ask AI" button is clicked anywhere on the page, `App` stores the query and passes it to `AISection` via props, avoiding global state or context.
- **`runPageTransition`** — exported as a module-level function from `PageTransition.jsx` so `AuthScreen` can trigger it imperatively without prop drilling.
=======
# JohriSumati-ops-THE-CITADEL-SOFTWARE-DEVELOPMENT
>>>>>>> c7f670060f70861de1168afabc03fe6fdf317e95
