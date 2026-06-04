import type { TaskGraph } from "../types/architecture.ts";
import { defaultGraph } from "../data/architecturePresets.ts";
import { composeArchitectureGraph } from "./composeArchitectureGraph.ts";
import { validateArchitectureGraph } from "./validateArchitectureGraph.ts";

export function buildArchitectureGraphFromIdea(): TaskGraph {
    const graph = composeArchitectureGraph();
    const result = validateArchitectureGraph(graph);
    if (!result.valid) {
        result.errors.forEach(error => console.error('[graph]', error));
        return defaultGraph;
    }
    return graph;
}
