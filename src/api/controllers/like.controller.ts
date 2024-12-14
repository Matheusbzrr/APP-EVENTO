import { Request, Response } from "express";
import likeService from "../../domain/services/like.service";
import { CreateLikeDTO } from "../../domain/dtos/like/createLike.dto";
import { NotFoundError, ValidationError, DatabaseError} from "../../infrastructure/utils/CustomErrors";

class LikeController {
    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const likes = await likeService.getAllLikes();
            res.json(likes);
        } catch (err: any) {
            console.error("Erro ao listar likes:", err.message || err);

            if (err instanceof DatabaseError) {
                res.status(500).send({ message: "Erro ao acessar likes." });
            } else {
                res.status(500).send({ message: "Erro inesperado ao listar os likes." });
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

            if (err instanceof ValidationError) {
                res.status(400).send({ message: err.message });
            } else if (err instanceof NotFoundError) {
                res.status(404).send({ message: err.message });
            } else if (err instanceof DatabaseError) {
                res.status(500).send({ message: "Erro ao salvar." });
            } else {
                res.status(500).send({ message: "Erro inesperado ao dar o like." });
            }
        }
    
    }
}

export default new LikeController();