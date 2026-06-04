import 'dotenv/config';
import {OpenAI} from "openai";
import type {TaskGraph} from "../src/types/architecture.ts";
import {readFile} from "node:fs/promises";
import {validateArchitectureGraph} from "../src/lib/validateArchitectureGraph.ts";

//gpt client
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const prompt = await readFile("docs/ai-graph-prompt.md", "utf-8");


export async function generateArchitectureWithAi(idea:string) : Promise<TaskGraph> {
    const response = await client.responses.create({
        model: "gpt-5.4-mini-2026-03-17",
        instructions: prompt,
        input: `Break down the task:
        ${idea}
        Return only valid JSON matching the TaskGraph contract.`,
        //max_output_tokens
    })
    const text = response.output_text

    let parsed: TaskGraph;
    try{
        parsed = JSON.parse(text)
    } catch {
        throw new Error("OpenAI returned an invalid JSON!")
    }
    const result = validateArchitectureGraph(parsed)

    if(!result.valid){
        throw new Error(result.errors.join("; "))
    }

    return parsed;

}




