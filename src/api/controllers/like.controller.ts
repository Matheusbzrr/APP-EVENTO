import { Request, Response } from "express";
import likeService from "../../domain/services/like.service";
import { CreateLikeDTO } from "../../domain/dtos/like/createLike.dto";
import { DatabaseError } from "../../domain/exceptions/data-base-error";
import { NotFoundError } from "../../domain/exceptions/not-found-error";
import { RecordNotFoundError } from "../../domain/exceptions/record-not-found";


class LikeController {
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const likes = await likeService.getAllLikes();
            res.json(likes);
        } catch (err: any) {
            console.error("Erro ao listar likes:", err.message || err);
            if (err instanceof NotFoundError) {
                res.status(404).send({ message: err.message });
            } else if (err instanceof DatabaseError) {
                res.status(503).send({ message: err.message });
            } else if (err instanceof TypeError) {
                res.status(500).send({ message:err.message });
            } else {
                res.status(500).send({ message: "Erro desconhecido" });
            }
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const likeData: CreateLikeDTO = req.body;

            const like = await likeService.createLike(likeData);
            res.status(201).json(like);
        } catch (err: any) {
            console.error("Erro ao dar like:", err.message || err);

            if (err instanceof RecordNotFoundError) {
                res.status(404).send({ message: err.message });
            } else if (err instanceof DatabaseError) {
                res.status(503).send({ message: err.message });
            } else if (err instanceof TypeError) {
                res.status(500).send({ message: err.message });
            } else {
                res.status(500).send({ message: "Erro inesperado ao dar o like." });
            }
        }
    
    }

    async countLikesPerPost(req: Request, res: Response): Promise<void> {
        try {const idPost = Number(req.params.idPost);
        if (isNaN(idPost)) {
            res.status(400).send({ message: "O ID da postagem deve ser um número válido." });
            return;
        }
        const result = await likeService.findPostWithLikes(idPost);
        res.status(200).json(result);
    } catch (err){
        console.error("Erro ao contar likes por postagem:");
        if (err instanceof NotFoundError) {
            res.status(404).send({ message: err.message });
        } else if (err instanceof DatabaseError) {
            res.status(503).send({ message: err.message });
        } else if (err instanceof TypeError) {
            res.status(500).send({ message: err.message });
        } else {
            res.status(500).send({ message: "Erro desconhecido." });
        }
    }
    }
    
}

export default new LikeController();