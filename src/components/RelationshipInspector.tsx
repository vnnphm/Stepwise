import type { ArchitectureRelationship } from '../types/architecture.ts'

interface RelationshipInspectorProps {
    relationship: ArchitectureRelationship
    onClose: () => void
    onDelete: () => void
}

export default function RelationshipInspector({ relationship, onClose, onDelete }: RelationshipInspectorProps) {
    return (
        <div className="node-inspector">
            <h3>Relationship Inspector</h3>
            <p><strong>From:</strong> {relationship.from}</p>
            <p><strong>To:</strong> {relationship.to}</p>
            <button type="button" onClick={onDelete}>
                Delete relationship
            </button>
            <button type="button" onClick={onClose}>
                Close
            </button>
        </div>
    )
}
