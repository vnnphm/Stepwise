import {useEffect, useState} from "react";
import CodebaseFlow from "./components/CodebaseFlow.tsx";
import {useFlowGraphState} from "./hooks/useFlowGraphState.ts";
import './App.css';
import {getArchitectureFeaturesFromIdea} from "./lib/getArchitectureFeaturesFromIdea.ts";
import {getArchitectureLabelFromFeatures} from "./lib/getArchitectureLabelFromFeatures.ts";
import {useGeneratedArchitectureGraph} from "./hooks/useGeneratedArchitectureGraph.ts";
import {useArchitectureGraphEditor} from "./hooks/useArchitectureGraphEditor.ts";
import NodeInspector from "./components/NodeInspector.tsx";
import RelationshipInspector from "./components/RelationshipInspector.tsx";


export default function App() {
    const [idea, setIdea] = useState('')

    const {graph, setGraph, isLoading, error, generationVersion} = useGeneratedArchitectureGraph(idea)

    const editor = useArchitectureGraphEditor(graph, setGraph)

    const features = getArchitectureFeaturesFromIdea(idea)
    const label = getArchitectureLabelFromFeatures(features)

    const {flowNodes, flowEdges, onNodesChange} = useFlowGraphState(graph)

    useEffect(() => {
        editor.clearSelection()
    }, [generationVersion])

    return (
        <div>
            <main className="main">
                <div className="top-panel">
                    <header>
                        <h1>Codebase Visualizer</h1>
                        <p>Visualize your app idea as a codebase graph!</p>
                    </header>
                    <label className="idea-label" htmlFor="user-idea">App Idea
                        <input className="idea-input" id="user-idea"
                               value={idea}
                               onChange={(e) => setIdea(e.target.value)}
                        />
                    </label>
                    <p className="status-text">{label}</p>
                    {error && <p className="error-text">{error}</p>}
                </div>
                <div className="graph-panel-wrapper">
                    <div className="graph-panel">
                        <div className="graph-toolbar">
                            <button type="button" onClick={editor.addNode}>Add node</button>
                        </div>
                        <p className="graph-hint">Select an edge and press Delete to remove it.</p>
                        {isLoading
                            ? <p>Generating...</p>
                            : <CodebaseFlow
                                nodes={flowNodes}
                                edges={flowEdges}
                                onNodeClick={editor.selectNode}
                                onNodesChange={onNodesChange}
                                onConnect={editor.onConnect}
                                onEdgesChange={editor.onEdgesChange}
                                onEdgeClick={editor.selectEdge}
                            />
                        }
                    </div>
                    {editor.selectedNode && (
                        <NodeInspector
                            node={editor.selectedNode}
                            onClose={editor.clearSelection}
                            onRename={editor.renameNode}
                            onDelete={editor.deleteSelectedNode}
                        />
                    )}
                    {editor.selectedRelationship && (
                        <RelationshipInspector
                            relationship={editor.selectedRelationship}
                            onClose={editor.clearSelection}
                            onDelete={editor.deleteSelectedRelationship}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}
