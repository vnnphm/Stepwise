import type {ArchitectureGraph} from "../types/architecture.ts";
// import {buildArchitectureGraphFromIdea} from "./buildArchitectureGraph.ts";

export async function generateArchitectureGraphFromIdea(idea: string): Promise<ArchitectureGraph> {
    const response = await fetch('http://localhost:3000/api/generate-architecture', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea }),
    })

    if (!response.ok) {
        throw new Error('Failed to generate architecture graph');

    }


    const graph = await response.json() as ArchitectureGraph
    console.log(graph)
    return graph;

}