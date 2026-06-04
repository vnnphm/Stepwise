import { useEffect, useState } from "react";
import CodebaseFlow from "./components/CodebaseFlow.tsx";
import { useFlowGraphState } from "./hooks/useFlowGraphState.ts";
import './App.css';
import { useGeneratedArchitectureGraph } from "./hooks/useGeneratedArchitectureGraph.ts";
import { useArchitectureGraphEditor } from "./hooks/useArchitectureGraphEditor.ts";
import NodeInspector from "./components/NodeInspector.tsx";
import RelationshipInspector from "./components/RelationshipInspector.tsx";
import type{ReactFlowInstance} from "@xyflow/react";

export default function App() {
    const [idea, setIdea] = useState('')
    const [submittedIdea, setSubmittedIdea] = useState('')
    const [flowInstance, setFlowInstance] = useState<ReactFlowInstance | null>(null);

    const { graph, setGraph, isLoading, error, generationVersion } = useGeneratedArchitectureGraph(submittedIdea)
    const editor = useArchitectureGraphEditor(graph, setGraph)
    const { clearSelection } = editor

    const { flowNodes, flowEdges, onNodesChange } = useFlowGraphState(graph)

    useEffect(() => {
        clearSelection()
    }, [generationVersion, clearSelection])

    const hasRightPanel = !!(editor.selectedNode || editor.selectedRelationship)

    function handleBreakdown(){
        setSubmittedIdea(idea)
    }


    return (
        <div className="app">
            {/* Top Navigation Bar */}
            <header className="topbar">
                <div className="topbar-left">
                    <span className="brand">Stepwise</span>
                    <nav className="topbar-nav">
                        <a className="nav-link nav-link--active" href="#">Goals</a>
                        <a className="nav-link" href="#">Templates</a>
                        <a className="nav-link" href="#">History</a>
                    </nav>
                </div>
                <div className="topbar-right">
                    <button className="btn btn--ghost">Save</button>
                    <button className="btn btn--primary">Export</button>
                    <div className="topbar-divider" />
                    <span className="icon-btn material-symbols-outlined">settings</span>
                    <span className="icon-btn material-symbols-outlined">help</span>
                </div>
            </header>

            {/* Left Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="project-icon">
                        <span className="material-symbols-outlined">route</span>
                    </div>
                    <div>
                        <div className="project-name">{idea.trim() ? idea : 'Your Goal'}</div>
                        <div className="project-subtitle">Step Breakdown</div>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <button className="sidebar-item sidebar-item--active">
                        <span className="material-symbols-outlined">checklist</span>
                        Steps
                    </button>
                    <button className="sidebar-item">
                        <span className="material-symbols-outlined">track_changes</span>
                        Progress
                    </button>
                    <button className="sidebar-item">
                        <span className="material-symbols-outlined">account_tree</span>
                        Flow
                    </button>
                    <button className="sidebar-item">
                        <span className="material-symbols-outlined">sticky_note_2</span>
                        Notes
                    </button>
                    <button className="sidebar-item">
                        <span className="material-symbols-outlined">auto_awesome</span>
                        Templates
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <button className="btn btn--primary btn--full" onClick={editor.addNode}>
                        <span className="material-symbols-outlined">add</span>
                        Add Step
                    </button>
                    <div className="sidebar-bottom-links">
                        <a className="sidebar-bottom-link" href="#">
                            <span className="material-symbols-outlined">description</span>
                            Docs
                        </a>
                        <a className="sidebar-bottom-link" href="#">
                            <span className="material-symbols-outlined">logout</span>
                            Logout
                        </a>
                    </div>
                </div>
            </aside>

            {/* Main Canvas */}
            <main className={`canvas${hasRightPanel ? ' canvas--with-panel' : ''}`}>
                {/* Prompt Bar */}
                <form onSubmit={handleBreakdown}>
                <div className="prompt-bar-wrapper">
                    <div className="prompt-bar">
                        <span className="material-symbols-outlined prompt-icon">auto_awesome</span>
                        <input
                            className="prompt-input"
                            placeholder="Describe your goal or task to break it down…"
                            value={idea}
                            onChange={(e) => setIdea(e.target.value)}
                        />
                        <button className="btn btn--primary" onClick={handleBreakdown}>Break it down</button>
                    </div>
                    {error && <p className="error-badge">{error}</p>}
                </div>
                </form>

                {isLoading ? (
                    <div className="canvas-loading">
                        <span className="material-symbols-outlined loading-icon">auto_awesome</span>
                        Breaking down your goal…
                    </div>
                ) : (
                    <div className="flow-wrapper">
                        <CodebaseFlow
                            nodes={flowNodes}
                            edges={flowEdges}
                            onNodeClick={editor.selectNode}
                            onNodesChange={onNodesChange}
                            onConnect={editor.onConnect}
                            onEdgesChange={editor.onEdgesChange}
                            onEdgeClick={editor.selectEdge}
                            onInit={setFlowInstance}
                        />
                    </div>
                )}

                {/* Canvas Controls */}
                <div className="canvas-controls">
                    <button className="canvas-ctrl-btn" onClick={()=> flowInstance?.zoomIn()}>
                        <span className="material-symbols-outlined">zoom_in</span>
                    </button>
                    <div className="canvas-ctrl-divider" />
                    <button className="canvas-ctrl-btn" onClick={()=> flowInstance?.zoomOut()}>
                        <span className="material-symbols-outlined">zoom_out</span>
                    </button>
                    <span className="canvas-ctrl-label">100%</span>
                    <div className="canvas-ctrl-divider" />
                    <button className="canvas-ctrl-btn" onClick={() =>flowInstance?.fitView()}>
                        <span className="material-symbols-outlined">center_focus_weak</span>
                    </button>
                </div>
            </main>

            {/* Right Panels */}
            {editor.selectedNode && (
                <NodeInspector
                    node={editor.selectedNode}
                    onClose={clearSelection}
                    onRename={editor.renameNode}
                    onChangeKind={editor.changeNodeKind}
                    onDelete={editor.deleteSelectedNode}
                />
            )}
            {editor.selectedRelationship && (
                <RelationshipInspector
                    relationship={editor.selectedRelationship}
                    onClose={clearSelection}
                    onDelete={editor.deleteSelectedRelationship}
                />
            )}
        </div>
    );
}
