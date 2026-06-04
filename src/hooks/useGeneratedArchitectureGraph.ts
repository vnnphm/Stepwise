import { useEffect, useState } from "react";
import type { TaskGraph } from "../types/architecture.ts";
import { generateArchitectureGraphFromIdea } from "../lib/generateArchitectureGraphFromIdea.ts";
import { defaultGraph } from "../data/architecturePresets.ts";

export function useGeneratedArchitectureGraph(idea: string) {
    const [graph, setGraph] = useState<TaskGraph | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [generationVersion, setGenerationVersion] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [snapshotIdea, setSnapshotIdea] = useState(idea)
    const normalizedIdea = idea.trim().replace(/\s+/g, ' ')

    if (snapshotIdea !== normalizedIdea) {
        setSnapshotIdea(normalizedIdea)
        setGraph(null)
        setError(null)
        setIsLoading(!!normalizedIdea)

    }

    useEffect(() => {
        if (!normalizedIdea) return

        let canceled = false

        const timer = setTimeout(async () => {
            try {
                const result = await generateArchitectureGraphFromIdea(normalizedIdea)
                if (!canceled) {
                    setGraph(result)
                    setGenerationVersion((v) => v + 1)
                }
            } catch (e) {
                if (!canceled) {
                    console.error(e)
                    setError('Could not break down your goal. Please try again.')
                }
            } finally {
                if (!canceled) setIsLoading(false)
            }
        }, 500)

        return () => {
            canceled = true
            clearTimeout(timer)
        }
    }, [normalizedIdea])

    return { graph: graph ?? defaultGraph, setGraph, isLoading, error, generationVersion }
}
