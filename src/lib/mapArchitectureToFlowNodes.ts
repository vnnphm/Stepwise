import type {Edge, Node} from "@xyflow/react";
import type {ArchitectureGraph, ArchitectureNodeKind} from "../types/architecture.ts";

function getPositionFromKind(kind: ArchitectureNodeKind): {x: number, y:number}{
    switch (kind) {
        case 'frontend': return {x: 80, y: 100};
        case 'backend': return {x: 320, y: 100};
        case 'database': return {x: 560, y: 100};
        case 'realtime': return {x: 320, y: 260};
        case 'payments': return {x: 320, y: 260};
        case "analytics": return {x: 320, y: 260};
        case 'cache': return {x: 560, y: 260};
        default: return {x: 0, y: 0};
    }
}


export  function mapArchitectureToFlowNodes(graph : ArchitectureGraph,): Node[] {
    return graph.nodes.map((node) =>{
        return {
            id: node.id,
            position: node.position ?? getPositionFromKind(node.kind),
            data: {label: node.label},
        }
    })



}

export function mapArchitectureRelationshipToFlowEdges(graph : ArchitectureGraph,): Edge[] {
    return graph.relationships.map(
        (relationship) =>{
            return{
                id: `${relationship.from}-${relationship.to}`,
                source: relationship.from,
                target: relationship.to,
            }
        })

}