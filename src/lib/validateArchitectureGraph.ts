import type {ArchitectureGraph} from "../types/architecture.ts";

export interface ValidationResult {
    valid: boolean;
    errors: string[];
}

export function validateArchitectureGraph(graph: ArchitectureGraph): ValidationResult {
    const errors: string[] = [];
    const nodeIds = new Set(graph.nodes.map(node => node.id));

    // check duplicates
    if (nodeIds.size !== graph.nodes.length) {
        const seen = new Set<string>();
        graph.nodes.forEach(node => {
            if (seen.has(node.id)) {
                errors.push(`Duplicate node id: "${node.id}"`);
            }
            seen.add(node.id);
        });
    }

    // check duplicate relationships
    const relationshipIds = new Set<string>();
    graph.relationships.forEach(relationship => {
        const key = `${relationship.from}-${relationship.to}`;
        if (relationshipIds.has(key)) {
            errors.push(`Duplicate relationship: "${relationship.from}" -> "${relationship.to}"`);
        }
        relationshipIds.add(key);
    });

// check relationships reference valid nodes
    graph.relationships.forEach(relationship => {
        if (!nodeIds.has(relationship.from)) {
            errors.push(`Relationship references missing "from" node: "${relationship.from}"`);
        }
        if (!nodeIds.has(relationship.to)) {
            errors.push(`Relationship references missing "to" node: "${relationship.to}"`);
        }
    });

    return {
        valid: errors.length === 0,
        errors,
    }
}