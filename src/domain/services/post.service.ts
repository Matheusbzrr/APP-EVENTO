import { CreatePostDTO } from "../dtos/post/createPost.dto";
import { PostDTO } from "../dtos/post/post.dto";
import postRepository from "../repositories/post.repository";

class PostService {
    async getAllPosts(): Promise<PostDTO[]> {
        return await postRepository.findAll();
    }

    async getPostsByParticipantEmail(email: string): Promise<PostDTO[]> {
        return await postRepository.findByParticipantEmail(email);
    }

    async createPost(postData: CreatePostDTO): Promise<PostDTO> {
        return await postRepository.create(postData);
    }

    async deletePost(id: number): Promise<void> {
        await postRepository.delete(id);
    }
}

export default new PostService();