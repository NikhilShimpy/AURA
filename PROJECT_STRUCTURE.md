
# 🏗️ Aura Project Structure

Aura follows a modular, feature-first architecture designed for scalability and separation of concerns.

```
/
├── components/            # UI Components
│   ├── Auth.tsx           # Login & Registration with Role Selection
│   ├── Layout.tsx         # Responsive Sidebar & Shell
│   ├── Dashboard.tsx      # Main Student HUD (Mood, Sleep, PEN)
│   ├── FocusZone.tsx      # Flow State Tool (Audio Engine + Timer)
│   ├── Journal.tsx        # Reflect Tool with AI Analysis
│   ├── Campfire.tsx       # Anonymous Chat System
│   ├── FutureSimulator.tsx # Gemini-powered Career Projection
│   └── AdminPanel.tsx     # Admin & Mentor Analytics
│
├── services/
│   ├── firebase.ts        # Firebase Init & Auth Logic
│   └── gemini.ts          # Google GenAI Client & Prompt Engineering
│
├── types.ts               # TypeScript Interfaces (User, Metrics, Logs)
├── App.tsx                # Main Routing & State Logic
├── index.tsx              # Entry Point
├── index.html             # HTML Shell & Tailwind Imports
└── ...config files
```

## Key Architectural Decisions

1.  **Service Layer Pattern:** Direct Firebase/AI calls are abstracted into `services/` to allow for easy swapping or mocking.
2.  **Container/Presenter:** Complex logic (like the Audio Engine in FocusZone) is kept separate from purely presentational components.
3.  **Real-time First:** The entire app relies on Firestore `onSnapshot` listeners rather than one-time `get` requests, ensuring the "Control Tower" and "Chat" are always live.
