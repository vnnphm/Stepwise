import { useCallback, useMemo, useState } from "react";
import { applyNodeChanges, type NodeChange } from "@xyflow/react";
import { mapArchitectureRelationshipToFlowEdges, mapArchitectureToFlowNodes } from "../lib/mapArchitectureToFlowNodes.ts";
import type { TaskGraph } from "../types/architecture.ts";

export function useFlowGraphState(graph: TaskGraph) {
    const [snapshotGraph, setSnapshotGraph] = useState(graph)
    const [flowNodes, setFlowNodes] = useState(() => mapArchitectureToFlowNodes(graph))

    if (snapshotGraph !== graph) {
        setSnapshotGraph(graph)
        setFlowNodes(mapArchitectureToFlowNodes(graph))
    }

    const flowEdges = useMemo(() => mapArchitectureRelationshipToFlowEdges(graph), [graph])

    const onNodesChange = useCallback((changes: NodeChange[]) => {
        setFlowNodes((current) => applyNodeChanges(changes, current))
    }, [])

    return { flowNodes, flowEdges, onNodesChange }
}
