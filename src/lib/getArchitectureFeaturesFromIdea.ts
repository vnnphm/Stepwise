import type {ArchitectureFeature} from "../types/architecture.ts";

const featureKeywords: Record<ArchitectureFeature, string[]> = {
    chat:      ['chat', 'message', 'messaging', 'realtime'],
    shop:      ['shop', 'store', 'ecommerce', 'buy', 'cart', 'retail', 'payment'],
    analytics: ['analytics', 'dashboard', 'metrics', 'tracking', 'stats'],
}

export function getArchitectureFeaturesFromIdea(idea: string): ArchitectureFeature[]{
    const lower = idea.toLowerCase();

    return (Object.entries(featureKeywords) as [ArchitectureFeature, string[]][])
        .filter(([, keywords]) => keywords.some(k => lower.includes(k)))
        .map(([feature]) => feature);

}

