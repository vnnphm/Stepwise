import {useCallback, useEffect, useState} from "react";
import {applyNodeChanges, type NodeChange} from "@xyflow/react";
import {mapArchitectureRelationshipToFlowEdges, mapArchitectureToFlowNodes} from "../lib/mapArchitectureToFlowNodes.ts";
import type {ArchitectureGraph} from "../types/architecture.ts";






//hook to use flow graph state
export function useFlowGraphState(graph: ArchitectureGraph) {
    const [flowNodes, setFlowNodes] = useState(() => mapArchitectureToFlowNodes(graph))
    const [flowEdges, setFlowEdges] = useState(() => mapArchitectureRelationshipToFlowEdges(graph))

    useEffect(() => {
        setFlowNodes(mapArchitectureToFlowNodes(graph))
        setFlowEdges(mapArchitectureRelationshipToFlowEdges(graph))
    }, [graph])

    const onNodesChange = useCallback((changes: NodeChange[]) => {
        setFlowNodes((currentNodes) => applyNodeChanges(changes, currentNodes))
    }, [])



    return{
        flowNodes,
        flowEdges,
        onNodesChange
    }



}