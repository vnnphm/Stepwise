import type { TaskGraph } from "../types/architecture.ts";
import { defaultGraph } from "../data/architecturePresets.ts";

export function composeArchitectureGraph(): TaskGraph {
    return defaultGraph;
}
