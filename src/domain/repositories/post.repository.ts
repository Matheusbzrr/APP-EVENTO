import { AppDataSource } from "../../infrastructure/db/data-source";
import { Post } from "../models/post";

class PostRepository {
    async findAll(): Promise<Post[]> {
        return await AppDataSource.getRepository(Post).find({
            relations: [
                "participant",
                "participant.areaOfExpertise",
                "likes",
                "likes.participant",
                "likes.participant.areaOfExpertise",
            ],
        });
    }

    async findByParticipantEmail(email: string): Promise<Post[]> {
        return await AppDataSource.getRepository(Post).find({
            where: { participant: { email } },
            relations: ["participant", "participant.areaOfExpertise"],
        });
    }

    async save(post: Post): Promise<Post> {
        return await AppDataSource.getRepository(Post).save(post);
    }

    async delete(id: number): Promise<number> {
        const result = await AppDataSource.getRepository(Post).delete(id);
        return result.affected || 0;
    }

    async findByIdAndParticipant(idPost: number, idParticipant: number): Promise<Post | null> {
        return await AppDataSource.getRepository(Post).findOne({
            where: { idPost, participant: { idParticipant } },
            relations: ["participant"],
        });
    }

    async update(post: Post, updates: Partial<Post>): Promise<Post> {
        Object.assign(post, updates);
        return await AppDataSource.getRepository(Post).save(post);
    }
}

export default new PostRepository();