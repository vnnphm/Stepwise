import { useCallback, useState } from 'react'
import type { TaskGraph, TaskStep, StepKind, StepConnection } from '../types/architecture.ts'
import type { Connection, EdgeChange, Node } from '@xyflow/react'

interface TaskGraphEditor {
    selectedNodeId: string | null
    selectedEdgeId: string | null
    selectedNode: TaskStep | null
    selectedRelationship: StepConnection | null
    selectNode: (event: React.MouseEvent, node: Node) => void
    selectEdge: (event: React.MouseEvent, edge: { id: string }) => void
    clearSelection: () => void
    addNode: () => void
    renameNode: (nodeId: string, newLabel: string) => void
    changeNodeKind: (nodeId: string, newKind: StepKind) => void
    deleteSelectedNode: () => void
    deleteSelectedRelationship: () => void
    onConnect: (connection: Connection) => void
    onEdgesChange: (changes: EdgeChange[]) => void
}

export function useArchitectureGraphEditor(
    graph: TaskGraph,
    setGraph: React.Dispatch<React.SetStateAction<TaskGraph | null>>
): TaskGraphEditor {
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
    const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null)

    const selectedNode = graph.nodes.find((node) => node.id === selectedNodeId) ?? null
    const selectedRelationship =
        graph.relationships.find(
            (rel) => `${rel.from}-${rel.to}` === selectedEdgeId
        ) ?? null

    function selectNode(_event: React.MouseEvent, node: Node) {
        setSelectedNodeId(node.id)
        setSelectedEdgeId(null)
    }

    function selectEdge(_event: React.MouseEvent, edge: { id: string }) {
        setSelectedEdgeId(edge.id)
        setSelectedNodeId(null)
    }

    const clearSelection = useCallback(() => {
        setSelectedNodeId(null)
        setSelectedEdgeId(null)
    }, [])

    function addNode() {
        const id = `step-${Date.now()}`
        const position = {
            x: 80 + Math.random() * 480,
            y: 80 + Math.random() * 280,
        }
        setGraph((current) => {
            const base = current ?? graph
            return {
                ...base,
                nodes: [...base.nodes, { id, kind: 'action', label: 'New Step', position }],
            }
        })
    }

    function renameNode(nodeId: string, newLabel: string) {
        setGraph((current) => {
            const base = current ?? graph
            return {
                ...base,
                nodes: base.nodes.map((node) =>
                    node.id === nodeId ? { ...node, label: newLabel } : node
                ),
            }
        })
    }

    function changeNodeKind(nodeId: string, newKind: StepKind) {
        setGraph((current) => {
            const base = current ?? graph
            return {
                ...base,
                nodes: base.nodes.map((node) =>
                    node.id === nodeId ? { ...node, kind: newKind } : node
                ),
            }
        })
    }

    function addRelationship(from: string, to: string) {
        setGraph((current) => {
            const base = current ?? graph
            if (base.relationships.some((r) => r.from === from && r.to === to)) return base
            return { ...base, relationships: [...base.relationships, { from, to }] }
        })
    }

    function deleteSelectedNode() {
        if (!selectedNodeId) return
        setGraph((current) => {
            const base = current ?? graph
            return {
                nodes: base.nodes.filter((n) => n.id !== selectedNodeId),
                relationships: base.relationships.filter(
                    (r) => r.from !== selectedNodeId && r.to !== selectedNodeId
                ),
            }
        })
        clearSelection()
    }

    function deleteSelectedRelationship() {
        if (!selectedEdgeId) return
        setGraph((current) => {
            const base = current ?? graph
            return {
                ...base,
                relationships: base.relationships.filter(
                    (r) => `${r.from}-${r.to}` !== selectedEdgeId
                ),
            }
        })
        clearSelection()
    }

    function onConnect(connection: Connection) {
        if (!connection.source || !connection.target) return
        if (connection.source === connection.target) return
        addRelationship(connection.source, connection.target)
    }

    function onEdgesChange(changes: EdgeChange[]) {
        const removedEdgeIds = changes
            .filter((change) => change.type === 'remove')
            .map((change) => change.id)

        if (removedEdgeIds.length === 0) return

        setGraph((current) => {
            const base = current ?? graph
            return {
                ...base,
                relationships: base.relationships.filter(
                    (r) => !removedEdgeIds.includes(`${r.from}-${r.to}`)
                ),
            }
        })
    }

    return {
        selectedNodeId,
        selectedEdgeId,
        selectedNode,
        selectedRelationship,
        selectNode,
        selectEdge,
        clearSelection,
        addNode,
        renameNode,
        changeNodeKind,
        deleteSelectedNode,
        deleteSelectedRelationship,
        onConnect,
        onEdgesChange,
    }
}
