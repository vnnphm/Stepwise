export const STEP_KINDS = ['action', 'decision', 'milestone', 'blocker', 'wait'] as const;
export type StepKind = typeof STEP_KINDS[number];

export interface TaskStep {
    id: string;
    kind: StepKind;
    label: string;
    position?: { x: number; y: number };
}

export interface StepConnection {
    from: string;
    to: string;
}

export interface TaskGraph {
    nodes: TaskStep[];
    relationships: StepConnection[];
}
