import { AppDataSource } from "../../infrastructure/db/data-source";
import { Like } from "../models/like";
import { DatabaseError } from "../exceptions/data-base-error";
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