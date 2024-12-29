import { AppDataSource } from "../../infrastructure/db/data-source";
import { Like } from "../models/like";
import { Participant } from "../models/participant";
import { Post } from "../models/post";
import { DatabaseError } from "../exceptions/data-base-error";
import { NotFoundError } from "../exceptions/not-found-error";
import { RecordNotFoundError } from "../exceptions/record-not-found";
import { CreateLikeDTO } from "../dtos/like/createLike.dto";
import { LikeDTO } from "../dtos/like/like.dto";
import { CountLikeDTO } from "../dtos/like/countLike.dto";

class LikeRepository {
    async findAll(): Promise<Like[]> {
        return await AppDataSource.getRepository(Like).find({
            relations: ["participant", "participant.areaOfExpertise", "post"],
        });
    }

    async findById(idLike: number): Promise<Like | null> {
        return await AppDataSource.getRepository(Like).findOne({
            where: { idLike },
            relations: ["participant", "post"],
        });
    }

    async save(like: Like): Promise<Like> {
        return await AppDataSource.getRepository(Like).save(like);
    }

    async countLikesPerPost(idPost: number): Promise<CountLikeDTO | null> {
        try {
            const result = await AppDataSource.getRepository(Like).query(
                "CALL CountLikesPerPostFiltre(?)",
                [idPost]
            );
    
            return result[0] as CountLikeDTO || null;
        } catch (error: any) {
            console.error("Erro ao executar procedimento CountLikesPerPostFiltre:", error);
            throw new DatabaseError("Erro ao contar likes no banco de dados.");
        }
    }
    async delete(idLike: number): Promise<number> {
        const result = await AppDataSource.getRepository(Like).delete({ idLike });
        return result.affected || 0;
    }
    
}

export default new LikeRepository();