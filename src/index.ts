import { PrismaClient } from "@prisma/client";
import type { Express, Request, Response } from "express";
import express from "express";

const app: Express = express();
const PORT = 8080;

app.use(express.json());
const prisma = new PrismaClient();

app.get("/todos", async(req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    return res.json(todos);
})

app.post("/todo", async(req: Request, res: Response) => {
    try {
        const {title, content, isCompleted} = req.body;
        const todos = await prisma.todo.create({
            data: {
                title,
                content,
                isCompleted,
            }
        });
        return res.json(todos);
    }catch(e) {
        return res.status(500).json(e);
    }
})

app.put("/todo/:id", async(req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const {title, content, isCompleted} = req.body;
        const todos = await prisma.todo.update({
            where: {id},
            data: {
                title,
                content,
                isCompleted,
            }
        });
        return res.json(todos);
    }catch(e) {
        return res.status(500).json(e);
    }
})

app.delete("/todo/:id", async(req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const todos = await prisma.todo.delete({
            where: {id},
        });
        return res.json(todos);
    }catch(e) {
        return res.status(500).json(e);
    }
})


app.listen(PORT, () => console.log("server is running"))