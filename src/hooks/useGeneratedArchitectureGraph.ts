import {useEffect, useState} from "react";
import type {ArchitectureGraph} from "../types/architecture.ts";
import {generateArchitectureGraphFromIdea} from "../lib/generateArchitectureGraphFromIdea.ts";
import {defaultGraph} from "../data/architecturePresets.ts";

export function useGeneratedArchitectureGraph(idea: string) {
    const [graph, setGraph] = useState<ArchitectureGraph | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [generationVersion, setGenerationVersion] = useState(0)
    const [isLoading, setIsLoading] = useState(false)  // ← explicit flag

    useEffect(() => {
        if (!idea.trim()) {          // ← skip empty idea
            setGraph(null)
            setError(null)
            setIsLoading(false)
            return
        }

        let canceled = false
        setGraph(null)
        setError(null)
        setIsLoading(true)           // ← set loading explicitly

        // Debounce: wait 500ms after the user stops typing
        const timer = setTimeout(async () => {
            try {
                const result = await generateArchitectureGraphFromIdea(idea)
                if (!canceled) {
                    setGraph(result)
                    setGenerationVersion((v) => v + 1)
                }
            } catch (e) {
                if (!canceled) {
                    setError('Failed to generate architecture graph. Please try again later.')
                }
            } finally {
                if (!canceled) setIsLoading(false)
            }
        }, 500)

        return () => {
            canceled = true
            clearTimeout(timer)      // ← cancel pending debounced call
        }
    }, [idea])

    return { graph: graph ?? defaultGraph, setGraph, isLoading, error, generationVersion }
}