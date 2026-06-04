import { STEP_KINDS } from "../types/architecture.ts";
import type { TaskGraph } from "../types/architecture.ts";

export interface ValidationResult {
    valid: boolean;
    errors: string[];
}

const VALID_KIND_SET = new Set<string>(STEP_KINDS);
const NODE_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// AI output is untrusted at runtime, so validate the raw JSON before treating it as a TaskGraph
export function validateArchitectureGraph(graph: unknown): ValidationResult {
    const errors: string[] = [];


    if(!graph || typeof graph !== "object") {
        return {valid: false, errors: ['Graph must be an object.']};
    }

    const potentiallyGraph = graph as Partial<TaskGraph>
    // First validate the top-level shape so later array logic doesn't crash
    if(!Array.isArray(potentiallyGraph.nodes)) {
        errors.push("Graph nodes must be an array!")

    }

    if (!Array.isArray(potentiallyGraph.relationships)) {
        errors.push('Graph relationships must be an array')
    }

    if (errors.length > 0) {
        return {valid: false, errors};
    }

    const nodes = potentiallyGraph.nodes!;
    const relationships = potentiallyGraph.relationships!;
    //Keep generated graphs small enough for the UI and prompt contract
    if(nodes.length < 4 || nodes.length > 8) {
        errors.push(`Graph must have between 4 and 8 nodes; got ${nodes.length}`);
    }


    if(relationships.length > 12) {
        errors.push(`Graph has too many relationships; got ${relationships.length}`);
    }

    const nodeIds = new Set<string>();
    const seenNodesIds = new Set<string>();

    nodes.forEach((node, index) => {
        if(!node || typeof node !== "object") {
            errors.push(`Node ${index} must be an object.`);
            return;
        }

        const candidate = node as{
            id?: unknown;
            kind?: unknown;
            label?: unknown;
        };

        if(typeof candidate.id !== "string") {
            errors.push(`Node ${index} must be a string`);
        }else{
            const id = candidate.id;
            //Node ids become react flow  ids, so keep them predictable
            if(!NODE_ID_PATTERN.test(id)) {
                errors.push(`Invalid node id: "${id}" for node ID.`);
            }

            if(seenNodesIds.has(id)) {
                errors.push(`Duplicate node id: ${id}`);
            }

            seenNodesIds.add(id);
            nodeIds.add(id);


        }

        if (typeof candidate.kind !== 'string') {
            errors.push(`Node ${index} kind must be a string`);
            // TypeScript unions do not protect us from JSON returned by the model.
        } else if (!VALID_KIND_SET.has(candidate.kind)) {
            errors.push(`Invalid step kind: "${candidate.kind}"`);
        }

        if (typeof candidate.label !== 'string') {
            errors.push(`Node ${index} label must be a string`);
        } else {
            const label = candidate.label.trim();
            // Labels are rendered in the UI, so reject empty or overly large text.

            if (label.length === 0) {
                errors.push(`Node ${index} label cannot be empty`);
            }

            if (label.length > 60) {
                errors.push(`Node "${candidate.id}" label is too long`);
            }
        }
    });

    const seenRelationships = new Set<string>();




    relationships.forEach((relationship, index) => {
        if (!relationship || typeof relationship !== 'object') {
            errors.push(`Relationship ${index} must be an object`);
            return;
        }

        const candidate = relationship as {
            from?: unknown;
            to?: unknown;
        };

        if (typeof candidate.from !== 'string') {
            errors.push(`Relationship ${index} from must be a string`);
        }

        if (typeof candidate.to !== 'string') {
            errors.push(`Relationship ${index} to must be a string`);
        }

        if (typeof candidate.from !== 'string' || typeof candidate.to !== 'string') {
            return;
        }
        // Self-links make task flow confusing so reject them for now
        if (candidate.from === candidate.to) {
            errors.push(`Relationship ${index} cannot connect a node to itself`);
        }
        // Relationships are only valid if both endpoints exist in the graph.
        if (!nodeIds.has(candidate.from)) {
            errors.push(`Relationship references missing step: "${candidate.from}"`);
        }

        if (!nodeIds.has(candidate.to)) {
            errors.push(`Relationship references missing step: "${candidate.to}"`);
        }

        const key = `${candidate.from}-${candidate.to}`;
        if (seenRelationships.has(key)) {
            errors.push(`Duplicate connection: "${candidate.from}" -> "${candidate.to}"`);
        }

        seenRelationships.add(key);
    });

    return {
        valid: errors.length === 0,
        errors,
    };
}

