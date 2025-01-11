import { CreatePostDTO } from "../dtos/post/createPost.dto";
import { PostDTO } from "../dtos/post/post.dto";
import postRepository from "../repositories/post.repository";
import { Participant } from "../models/participant";
import { Post } from "../models/post";
import { AppDataSource } from "../../infrastructure/db/data-source";
import { NotFoundError } from "../exceptions/not-found-error";

class PostService {
    async getAllPosts(): Promise<PostDTO[]> {
        const posts = await postRepository.findAll();

        if (!posts.length) {
            throw new NotFoundError("Nenhum post encontrado.");
        }

        return posts.map(this.mapPostToDTO);
    }

    async getPostsByParticipantEmail(email: string): Promise<PostDTO[]> {
        const posts = await postRepository.findByParticipantEmail(email);

        if (!posts.length) {
            throw new NotFoundError(`Nenhum post encontrado para o e-mail ${email}.`);
        }

        return posts.map(this.mapPostToDTO);
    }

    async createPost(postData: CreatePostDTO): Promise<PostDTO> {
        const participant = await AppDataSource.getRepository(Participant).findOne({
            where: { idParticipant: postData.idParticipant },
            relations: ["areaOfExpertise"],
        });

        if (!participant) {
            throw new NotFoundError(`Participante com ID ${postData.idParticipant} não encontrado.`);
        }

        const post = new Post();
        post.participant = participant;
        post.imageUrl = postData.imageUrl || "";
        post.description = postData.description || "";

        const savedPost = await postRepository.save(post);

        return this.mapPostToDTO(savedPost);
    }

    async deletePost(id: number): Promise<void> {
        const rowsAffected = await postRepository.delete(id);

        if (rowsAffected === 0) {
            throw new NotFoundError(`Post com ID ${id} não encontrado para exclusão.`);
        }
    }

    async updatePost(idPost: number, idParticipant: number, updates: Partial<Post>): Promise<PostDTO> {
        const post = await postRepository.findByIdAndParticipant(idPost, idParticipant);

        if (!post) {
            throw new NotFoundError(
                `Post com ID ${idPost} não encontrado ou participante não autorizado a atualizá-lo.`
            );
        }

        const updatedPost = await postRepository.update(post, updates);

        return this.mapPostToDTO(updatedPost);
    }

    private mapPostToDTO(post: Post): PostDTO {
        return {
            idPost: post.idPost,
            imageUrl: post.imageUrl || "",
            description: post.description || "",
            participant: {
                idParticipant: post.participant.idParticipant,
                name: post.participant.name || "Sem nome",
                email: post.participant.email || "Sem e-mail",
                companyName: post.participant.companyName || "Sem empresa",
                position: post.participant.position || "Sem cargo",
                contact: post.participant.contact || "Sem contato",
                postPermission: post.participant.postPermission || 0,
                AreaOfExpertise: post.participant.areaOfExpertise?.map(area => ({
                    idArea: area.idArea,
                    name: area.name,
                })) || [],
            },
            likes: post.likes?.map(like => ({
                idLike: like.idLike,
                idPost: like.post?.idPost || 0,
                participant: like.participant
                    ? {
                          idParticipant: like.participant.idParticipant,
                          name: like.participant.name || "Sem nome",
                          email: like.participant.email || "Sem e-mail",
                          companyName: like.participant.companyName || "Sem empresa",
                          position: like.participant.position || "Sem cargo",
                          contact: like.participant.contact || "Sem contato",
                          postPermission: like.participant.postPermission || 0,
                          AreaOfExpertise: like.participant.areaOfExpertise?.map(area => ({
                              idArea: area.idArea,
                              name: area.name,
                          })) || [],
                      }
                    : null,
            })) || [],
        };
    }
}

export default new PostService();