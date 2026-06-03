export type ArchitectureNodeKind = 'frontend' | 'backend' | 'database' | 'realtime' | "payments" |'analytics' | 'cache';
export type ArchitectureFeature = 'chat' | 'shop' | 'analytics';

export interface ArchitectureNode {
    id: string;
    kind: ArchitectureNodeKind;
    label: string;
    position?: { x: number; y: number };
}

export interface ArchitectureRelationship{
    from: string;
    to: string;
}

export interface ArchitectureGraph{
    nodes: ArchitectureNode[]
    relationships: ArchitectureRelationship[]
}

