import type {ArchitectureGraph} from "../types/architecture.ts";
import { defaultGraph} from "../data/architecturePresets.ts";
import {composeArchitectureGraph} from "./composeArchitectureGraph.ts";
import {getArchitectureFeaturesFromIdea} from "./getArchitectureFeaturesFromIdea.ts";
import {validateArchitectureGraph} from "./validateArchitectureGraph.ts";


export function buildArchitectureGraphFromIdea(idea: string): ArchitectureGraph {
    const features = getArchitectureFeaturesFromIdea(idea);
    const graph = composeArchitectureGraph(features);

    const result = validateArchitectureGraph(graph);
    if (!result.valid) {
        result.errors.forEach(error => console.error('[graph]', error));
        return defaultGraph;
    }

    return graph;
}

