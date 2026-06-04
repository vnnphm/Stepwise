import {
    ReactFlow,
    Background,
    BackgroundVariant,
    type OnConnect,
    type OnEdgesChange,
    type EdgeMouseHandler, type ReactFlowInstance,
} from "@xyflow/react";
import type {Node, Edge, NodeMouseHandler, OnNodesChange} from "@xyflow/react";


interface CodebaseFlowProps {
    nodes: Node[];
    edges: Edge[];
    onNodeClick: NodeMouseHandler;
    onNodesChange: OnNodesChange;
    onConnect: OnConnect;
    onEdgesChange: OnEdgesChange;
    onEdgeClick: EdgeMouseHandler;
    onInit: (instance: ReactFlowInstance) => void;
}

export default function CodebaseFlow({
                                         nodes,
                                         edges,
                                         onNodeClick,
                                         onNodesChange,
                                         onConnect,
                                         onEdgesChange,
                                         onEdgeClick,
                                         onInit,
                                     }: CodebaseFlowProps) {
return(
    <div style={{ height: '100%', width: '100%' }}>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodeClick={onNodeClick}
            onNodesChange={onNodesChange}
            onConnect={onConnect}
            onEdgesChange={onEdgesChange}
            fitView={true}
            onEdgeClick={onEdgeClick}
            colorMode="dark"
            onInit={onInit}

        >
            <Background variant={BackgroundVariant.Dots} color="#424769" gap={32} size={1} />
        </ReactFlow>
    </div>
)};
