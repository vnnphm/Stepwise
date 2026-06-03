import type {ArchitectureGraph, ArchitectureNode, ArchitectureRelationship, ArchitectureFeature} from "../types/architecture.ts";

export interface ArchitectureAddition {
    nodes : ArchitectureNode[];
    relationships : ArchitectureRelationship[];
}

export const featureAdditions: Record<ArchitectureFeature, ArchitectureAddition> = {
    chat: {
        nodes:         [{ id: 'realtime',  kind: 'realtime',  label: 'Realtime'  }],
        relationships: [{ from: 'frontend', to: 'realtime' }],
    },
    shop: {
        nodes:         [{ id: 'payments',  kind: 'payments',  label: 'Payments'  }],
        relationships: [{ from: 'backend', to: 'payments' }],
    },
    analytics: {
        nodes:         [
            { id: 'analytics', kind: 'analytics', label: 'Analytics' },
            { id: 'cache',     kind: 'cache',     label: 'Cache'     },
        ],
        relationships: [
            { from: 'backend', to: 'analytics' },
            { from: 'backend', to: 'cache'     },
        ],
    },
}



const base: ArchitectureGraph = {
    nodes: [
        { id: 'frontend', kind: 'frontend', label: 'Frontend' },
        { id: 'backend',  kind: 'backend',  label: 'Backend'  },
        { id: 'database', kind: 'database', label: 'Database' },
    ],
    relationships: [
        { from: 'frontend', to: 'backend'  },
        { from: 'backend',  to: 'database' },
    ]
}



export function extendArchitectureGraph(base: ArchitectureGraph, nodes: ArchitectureNode[], relationships: ArchitectureRelationship[]):ArchitectureGraph {
    return{
        nodes: [...base.nodes, ...nodes],
        relationships: [...base.relationships, ...relationships]
    }

}


export const defaultGraph: ArchitectureGraph = base;


