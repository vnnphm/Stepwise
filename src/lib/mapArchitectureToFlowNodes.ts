import type { Edge, Node } from "@xyflow/react";
import type { TaskGraph } from "../types/architecture.ts";



export function mapArchitectureToFlowNodes(graph: TaskGraph): Node[] {

    return graph.nodes.map((node, index) => {
        if (node.position) {
            return { id: node.id, position: node.position, data: { label: node.label } }
        }


        return {
            id: node.id,
            position: { x: 120 + index * 220,
            y: 180,},
            data: { label: node.label },
        }
    })
}

export function mapArchitectureRelationshipToFlowEdges(graph: TaskGraph): Edge[] {
    return graph.relationships.map((rel) => ({
        id: `${rel.from}-${rel.to}`,
        source: rel.from,
        target: rel.to,
    }))
}
