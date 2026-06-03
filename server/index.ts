import express from "express";
import cors from "cors";
import {generateArchitectureWithAi} from "./generateArchitectureWithAi.ts";

const app = express();


app.use(cors());
app.use(express.json());

//post statement

app.post("/api/generate-architecture", async (req, res) => {
    //request idea
    const idea = req.body.idea;
    //if idea is empty, send error saying cant be empty string
    if (typeof idea !== "string" || idea.trim() === '') {
        res.status(400).send({error: 'idea must be a non-empty string'});
        return
    }
    try {
        const graph = await generateArchitectureWithAi(idea)
        return res.json(graph);

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            error: 'Failed to generate architecture graph!',
        })
    }

})

app.listen(3000, () => console.log('server running on port 3000'))
