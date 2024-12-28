import { Request, Response } from "express";
import postService from "../../domain/services/post.service";
import { NotFoundError } from "../../domain/exceptions/not-found-error";
import { DatabaseError } from "../../domain/exceptions/data-base-error";
import { ValidationError } from "../../domain/exceptions/validation-error";

class PostController {
    async getAllPosts(req: Request, res: Response): Promise<void> {
        try {
            const posts = await postService.getAllPosts();
            res.status(200).json(posts);
        } catch (err: any) {
            console.error("Erro ao buscar posts:", err);
            if (err instanceof DatabaseError) {
                res.status(503).send({ message: err.message });
            } else {
                res.status(500).send({ message: "Erro inesperado ao buscar posts." });
            }
        }
    }

    async getPostsByParticipantEmail(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.query;
            if (!email || typeof email !== "string") {
                res.status(400).send({ message: "E-mail inválido ou não fornecido." });
                return;
            }
            const posts = await postService.getPostsByParticipantEmail(email);
            res.status(200).json(posts);
        } catch (err: any) {
            console.error("Erro ao buscar posts por e-mail:", err);
            if (err instanceof NotFoundError) {
                res.status(404).send({ message: err.message });
            } else if (err instanceof DatabaseError) {
                res.status(503).send({ message: err.message });
            } else {
                res.status(500).send({ message: "Erro inesperado ao buscar posts." });
            }
        }
    }

    async createPost(req: Request, res: Response): Promise<void> {
        try {
            const { idParticipant, description } = req.body;

            if (!idParticipant || !description || !req.file) {
                throw new ValidationError("Todos os campos são obrigatórios.");
            }

            // Obtenha o caminho da imagem
            const imageUrl = `/uploads/${req.file.filename}`;

            const postData = {
                idParticipant,
                description,
                imageUrl,
            };

            const post = await postService.createPost(postData);
            res.status(201).json(post);
        } catch (err: any) {
            console.error("Erro ao criar post:", err);
            if (err instanceof ValidationError) {
                res.status(400).send({ message: err.message });
            } else if (err instanceof DatabaseError) {
                res.status(503).send({ message: err.message });
            } else {
                res.status(500).send({ message: "Erro inesperado ao criar post." });
            }
        }
    }

    async deletePost(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await postService.deletePost(Number(id));
            res.status(204).send();
        } catch (err: any) {
            console.error("Erro ao excluir post:", err);
            if (err instanceof NotFoundError) {
                res.status(404).send({ message: err.message });
            } else if (err instanceof DatabaseError) {
                res.status(503).send({ message: err.message });
            } else {
                res.status(500).send({ message: "Erro inesperado ao excluir post." });
            }
        }
    }
}

export default new PostController();