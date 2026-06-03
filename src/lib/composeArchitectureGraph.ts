import type {ArchitectureFeature, ArchitectureGraph} from "../types/architecture.ts";
import {defaultGraph, featureAdditions} from "../data/architecturePresets.ts";
import {extendArchitectureGraph} from "../data/architecturePresets.ts";




export function composeArchitectureGraph(features: ArchitectureFeature[]): ArchitectureGraph {
    return features.reduce((graph, feature) => {
        const addition = featureAdditions[feature];
        return extendArchitectureGraph(graph, addition.nodes, addition.relationships);
    }, defaultGraph);
}