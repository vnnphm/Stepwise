import {
    ReactFlow,
    Background,
    Controls,
    type OnConnect,
    type OnEdgesChange,
    type EdgeMouseHandler,
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
}

export default function CodebaseFlow({
                                         nodes,
                                         edges,
                                         onNodeClick,
                                         onNodesChange,
                                         onConnect,
                                         onEdgesChange,
                                         onEdgeClick,
                                     }: CodebaseFlowProps) {
return(
    <div style={{ height: '600px', width: '100%' }}>
        <ReactFlow nodes={nodes}
                   edges={edges}
                   onNodeClick={onNodeClick}
	                   onNodesChange={onNodesChange}
	                   onConnect={onConnect}
                       onEdgesChange={onEdgesChange}
	                   fitView={true}
                   onEdgeClick={onEdgeClick}
        >
            <Background />
            <Controls />
        </ReactFlow>
    </div>
)};
