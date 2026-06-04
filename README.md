# Stepwise

Stepwise is a React + TypeScript app that turns a plain-language goal into an interactive step-by-step graph. Enter an idea, generate a breakdown with AI, then inspect, edit, connect, and organize the steps visually on a React Flow canvas.

## What it does

- Generates a small task graph from a user-provided goal
- Displays the graph as draggable nodes and connections
- Supports step types such as `action`, `decision`, `milestone`, `blocker`, and `wait`
- Lets users select and inspect nodes or relationships
- Lets users add, rename, change, connect, and delete steps
- Validates AI output before using it in the app
- Uses Express to call the OpenAI API safely from the server side to not expose any API keys

## Tech stack

- React
- TypeScript
- Vite
- React Flow / `@xyflow/react`
- Express
- OpenAI API
- dotenv
- ESLint

## Project structure

```txt
arch-visualizer/
├── docs/
│   └── ai-graph-prompt.md        # Prompt contract for AI graph generation
├── public/                       # Static assets
├── server/
│   ├── generateArchitectureWithAi.ts
│   └── index.ts                  # Express API server
├── src/
│   ├── components/               # Graph canvas and inspector panels
│   ├── data/                     # Default graph preset
│   ├── hooks/                    # Graph generation, editing, and React Flow state
│   ├── lib/                      # API client, mapping, and validation helpers
│   ├── types/                    # Task graph TypeScript types
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── vite.config.ts
```

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/vnnphm/arch-visualizer.git
cd arch-visualizer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your environment variable

Create a `.env` file in the root of the project:

```env
OPENAI_API_KEY=your_api_key_here
```

The backend reads this key with `dotenv` and uses it to call the OpenAI API.

### 4. Start the backend server

```bash
npm run server
```

The Express server runs on:

```txt
http://localhost:3000
```

It exposes this endpoint:

```txt
POST /api/generate-architecture
```

Example request body:

```json
{
  "idea": "Build a portfolio website"
}
```

### 5. Start the frontend

In a second terminal, run:

```bash
npm run dev
```

Open the local Vite URL shown in your terminal, usually:

```txt
http://localhost:5173
```

## Available scripts

```bash
npm run dev       # Start the Vite development server
npm run server    # Start the Express backend server
npm run build     # Type-check and build the frontend
npm run lint      # Run ESLint
npm run preview   # Preview the production build
```

## How the app works

1. The user types a goal, or any question into the prompt bar.
2. The frontend sends the prompt to the backend at `http://localhost:3000/api/generate-architecture`.
3. The backend sends the prompt to the OpenAI API with a strict prompt from `docs/ai-graph-prompt.md`.
4. GPT returns JSON in the `TaskGraph` shape.
5. The app validates the graph before rendering it to the flow. 
6. The graph is then mapped into React Flow nodes and edges
7. The user can move nodes, inspect details, add steps, rename steps, and edit connections.

## Task graph format

The app expects AI-generated graphs to follow this shape:

```ts
interface TaskGraph {
  nodes: TaskStep[];
  relationships: StepConnection[];
}

interface TaskStep {
  id: string;
  kind: 'action' | 'decision' | 'milestone' | 'blocker' | 'wait';
  label: string;
  position?: {
    x: number;
    y: number;
  };
}

interface StepConnection {
  from: string;
  to: string;
}
```

Example:

```json
{
  "nodes": [
    { "id": "clarify-goal", "kind": "milestone", "label": "Clarify the goal" },
    { "id": "outline-steps", "kind": "action", "label": "Outline the steps" },
    { "id": "build-first", "kind": "action", "label": "Build first version" },
    { "id": "review-result", "kind": "decision", "label": "Review the result" }
  ],
  "relationships": [
    { "from": "clarify-goal", "to": "outline-steps" },
    { "from": "outline-steps", "to": "build-first" },
    { "from": "build-first", "to": "review-result" }
  ]
}
```

## Validation rules

Generated graphs are validated before they are used. The validator checks that:

- The graph has to have a `nodes` array and a `relationships` array
- There are 4 to 8 nodes (To prevent prompt injection + performance issues)
- Node IDs are unique, lowercase, and hyphenated
- Node kinds match the allowed step kinds
- Labels are not empty or too long
- Relationships only connect existing nodes
- Self-links and duplicate connections are rejected 

## Status/Updates

This project is currently a very early prototype. The core graph generation, validation, rendering, and editing flow is in place, but the UI and product features are still being developed.

## Future additions 

- Save generated graphs into a history tab
- Export graphs as JSON or images
- Add reusable task templates
- Add graph history
- Improve node layout and spacing
- Add richer node inspector details (i.e. when you click a node, it'll have subnodes when you press on it.)
- Support multi-branch decision flows
- Add more tests for graph validation and editing logic

## Notes

This project started from a React + TypeScript + Vite setup and is being expanded into an AI-powered visual task and architecture breakdown tool.
Initially, it was actually a codebase visualizer but I've pivoted it to break down questions or goals in general. 

