import type {ArchitectureNode} from "../types/architecture.ts";

interface NodeInspectorProps {
    node: ArchitectureNode;
    onClose: () => void;
    onRename: (nodeId: string, newLabel: string) => void;
    onDelete: () => void;
}

export default function NodeInspector({ node, onClose, onRename, onDelete }: NodeInspectorProps) {
    return(
        <div className="node-inspector">
            <h3>Node Inspector</h3>
            <label>
                Label
                <input
                    value={node.label}
                    onChange={(event) => onRename(node.id, event.target.value)}
                />
            </label>
            <p><strong>Kind:</strong> {node.kind}</p>
            <p><strong>ID:</strong> {node.id}</p>
            <button type="button" onClick={onDelete}>
                Delete node
            </button>
            <button type="button" onClick={onClose}>
                Close
            </button>
        </div>
    )

}