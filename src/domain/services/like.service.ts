import { request } from "express";
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

    async findPostWithLikes(idPost: number): Promise<any> {
        const result = await likeRepository.CountLikesPerPost(idPost);
        return result;
    }   

}

export default new LikeService();