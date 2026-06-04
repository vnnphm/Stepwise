import { STEP_KINDS } from "../types/architecture.ts";
import type { TaskStep, StepKind } from "../types/architecture.ts";

const KIND_ICONS: Record<StepKind, string> = {
    action:    'bolt',
    decision:  'call_split',
    milestone: 'flag',
    blocker:   'block',
    wait:      'hourglass_empty',
}

const KIND_LABELS: Record<StepKind, string> = {
    action:    'Action',
    decision:  'Decision',
    milestone: 'Milestone',
    blocker:   'Blocker',
    wait:      'Wait',
}

interface StepInspectorProps {
    node: TaskStep;
    onClose: () => void;
    onRename: (nodeId: string, newLabel: string) => void;
    onChangeKind: (nodeId: string, newKind: StepKind) => void;
    onDelete: () => void;
}

export default function NodeInspector({ node, onClose, onRename, onChangeKind, onDelete }: StepInspectorProps) {
    const icon = KIND_ICONS[node.kind]

    return (
        <aside className="right-panel">
            <div className="panel-header">
                <span className="panel-title">Step Inspector</span>
                <button className="panel-close" onClick={onClose}>
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            <div className="panel-body">
                {/* Step card */}
                <div className="node-card">
                    <div className="node-card-icon">
                        <span className="material-symbols-outlined">{icon}</span>
                    </div>
                    <div>
                        <div className="node-card-name">{node.label}</div>
                        <div className="node-card-id">{KIND_LABELS[node.kind]} · {node.id}</div>
                    </div>
                </div>

                {/* Step Details */}
                <div>
                    <span className="section-label">Step Details</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div className="field">
                            <label className="field-label">Label</label>
                            <input
                                className="field-input"
                                type="text"
                                value={node.label}
                                onChange={(e) => onRename(node.id, e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label className="field-label">Type</label>
                            <div className="field-select-wrapper">
                                <select
                                    className="field-input field-select"
                                    value={node.kind}
                                    onChange={(e) => onChangeKind(node.id, e.target.value as StepKind)}
                                >
                                    {STEP_KINDS.map((k) => (
                                        <option key={k} value={k}>{KIND_LABELS[k]}</option>
                                    ))}
                                </select>
                                <span className="material-symbols-outlined">expand_more</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step type descriptions */}
                <div className="metrics-card">
                    <span className="section-label" style={{ marginBottom: 12 }}>Step Types</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {STEP_KINDS.map((k) => (
                            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: node.kind === k ? 1 : 0.4 }}>
                                <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--primary)' }}>{KIND_ICONS[k]}</span>
                                <span style={{ fontSize: 12, color: 'var(--on-surface)' }}><strong>{KIND_LABELS[k]}</strong></span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="panel-footer">
                <button className="btn btn--ghost btn--full">
                    <span className="material-symbols-outlined">content_copy</span>
                    Duplicate Step
                </button>
                <button className="btn btn--error btn--full" onClick={onDelete}>
                    <span className="material-symbols-outlined">delete</span>
                    Delete Step
                </button>
            </div>
        </aside>
    )
}
