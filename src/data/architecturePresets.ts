import type { TaskGraph } from "../types/architecture.ts";

export const defaultGraph: TaskGraph = {
    nodes: [
        { id: 'clarify',  kind: 'milestone', label: 'Clarify the goal'     },
        { id: 'research', kind: 'action',    label: 'Research & gather info' },
        { id: 'plan',     kind: 'action',    label: 'Break into sub-steps'  },
        { id: 'start',    kind: 'action',    label: 'Start the first step'  },
    ],
    relationships: [
        { from: 'clarify',  to: 'research' },
        { from: 'research', to: 'plan'     },
        { from: 'plan',     to: 'start'    },
    ],
}
