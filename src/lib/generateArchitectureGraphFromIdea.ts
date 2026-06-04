import type { TaskGraph } from "../types/architecture.ts";
import { validateArchitectureGraph } from "./validateArchitectureGraph.ts";

export async function generateArchitectureGraphFromIdea(idea: string): Promise<TaskGraph> {
    const response = await fetch('http://localhost:3000/api/generate-architecture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
    })

    if (!response.ok) throw new Error('Failed to generate task breakdown');

    const graph = await response.json() as TaskGraph
    const validation = validateArchitectureGraph(graph)
    if (!validation.valid) {
        throw new Error(`Invalid graph from AI: ${validation.errors.join('; ')}`)
    }
    return graph;
}
