import { CreateLikeDTO } from "../dtos/like/createLike.dto";
import { LikeDTO } from "../dtos/like/like.dto";
import likeRepository from "../repositories/like.repository";

class LikeService {
    async getAllLikes(): Promise<LikeDTO[]> {
        return await likeRepository.findAll();
    }

    async createLike(likeData: CreateLikeDTO): Promise<LikeDTO> {
        return await likeRepository.create(likeData);
    }
}

export default new LikeService();