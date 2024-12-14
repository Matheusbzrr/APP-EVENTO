import { Request, Response } from "express";
import likeService from "../../domain/services/like.service";
import { CreateLikeDTO } from "../../domain/dtos/like/createLike.dto";

class LikeController {
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const likes = await likeService.getAllLikes();
            res.json(likes);
        } catch (err) {
            console.error("Erro ao listar likes:", err);
            res.status(500).send({ message: "Erro ao tentar listar todos os likes" });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const likeData: CreateLikeDTO = req.body;

            const like = await likeService.createLike(likeData);
            res.status(201).json(like);
        } catch (err: any) {
            console.error("Erro ao criar like:", err.message || err);
            res.status(500).send({
                message: "Erro ao criar like",
                error: err.message || "Erro desconhecido",
            });
        }
    }
}

export default new LikeController();