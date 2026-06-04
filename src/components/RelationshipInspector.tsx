import { useState } from 'react'
import type { StepConnection } from '../types/architecture.ts'

const CONNECTION_TYPES = ['Sequential', 'Parallel', 'Conditional', 'Optional'] as const
type ConnectionType = typeof CONNECTION_TYPES[number]

interface ConnectionInspectorProps {
    relationship: StepConnection
    onClose: () => void
    onDelete: () => void
}

export default function RelationshipInspector({ relationship, onClose, onDelete }: ConnectionInspectorProps) {
    const [activeType, setActiveType] = useState<ConnectionType>('Sequential')

    return (
        <aside className="right-panel">
            <div className="panel-header">
                <span className="panel-title">Connection</span>
                <button className="panel-close" onClick={onClose}>
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            <div className="panel-body">
                {/* From step */}
                <div>
                    <span className="section-label">From Step</span>
                    <div className="rel-node-card">
                        <div className="rel-node-icon">
                            <span className="material-symbols-outlined">bolt</span>
                        </div>
                        <div>
                            <div className="rel-node-name">{relationship.from}</div>
                            <div className="rel-node-id">source</div>
                        </div>
                    </div>
                </div>

                {/* Direction */}
                <div className="direction-indicator">
                    <div className="direction-bubble">
                        <span className="material-symbols-outlined">south</span>
                    </div>
                </div>

                {/* To step */}
                <div>
                    <span className="section-label">To Step</span>
                    <div className="rel-node-card rel-node-card--target">
                        <div className="rel-node-icon">
                            <span className="material-symbols-outlined">bolt</span>
                        </div>
                        <div>
                            <div className="rel-node-name">{relationship.to}</div>
                            <div className="rel-node-id">destination</div>
                        </div>
                    </div>
                </div>

                {/* Connection type */}
                <div>
                    <span className="section-label">Connection Type</span>
                    <div className="protocol-grid">
                        {CONNECTION_TYPES.map((t) => (
                            <button
                                key={t}
                                className={`protocol-btn${activeType === t ? ' protocol-btn--active' : ''}`}
                                onClick={() => setActiveType(t)}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Type descriptions */}
                <div className="metrics-card">
                    <span className="section-label" style={{ marginBottom: 8 }}>About this type</span>
                    <p style={{ fontSize: 13, color: 'var(--on-surface-variant)', lineHeight: '18px' }}>
                        {activeType === 'Sequential'  && 'This step must be fully completed before the next one begins.'}
                        {activeType === 'Parallel'    && 'Both steps can happen at the same time independently.'}
                        {activeType === 'Conditional' && 'The next step only happens if a condition is met.'}
                        {activeType === 'Optional'    && 'The next step is helpful but not required to proceed.'}
                    </p>
                </div>
            </div>

            <div className="panel-footer">
                <button className="btn btn--primary btn--full">
                    <span className="material-symbols-outlined">save</span>
                    Save Connection
                </button>
                <button className="btn btn--error btn--full" onClick={onDelete}>
                    <span className="material-symbols-outlined">delete</span>
                    Remove Connection
                </button>
            </div>
        </aside>
    )
}
