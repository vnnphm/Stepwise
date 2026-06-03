import type {ArchitectureFeature} from "../types/architecture.ts";

export function getArchitectureLabelFromFeatures(features: ArchitectureFeature[]): string{
    if (features.length === 0) return 'Default architecture detected';
    const label = features.join(', ')
    return label.charAt(0).toUpperCase() + label.slice(1) + ' architecture detected';

}