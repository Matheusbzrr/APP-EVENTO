import { AppDataSource } from "../../infrastructure/db/data-source";
import { PostDTO } from "../dtos/post/post.dto";
import { DatabaseError } from "../exceptions/data-base-error";
import { NotFoundError } from "../exceptions/not-found-error";
import { Post } from "../models/post";
import { Participant } from "../models/participant";
import { CreatePostDTO } from "../dtos/post/CreatePost.dto";

class PostRepository {
    postRepository = AppDataSource.getRepository(Post);

    async findAll(): Promise<PostDTO[]> {
        try {
            const posts = await this.postRepository.find({
                relations: ["participant", "participant.areaOfExpertise"],
            });

            if (!posts || posts.length === 0) {
                throw new NotFoundError("Nenhum post encontrado");
            }

            return posts.map(post => {
                if (!post.participant.areaOfExpertise) {
                    throw new Error(`Participante com ID ${post.participant.idParticipant} não possui áreas de expertise.`);
                }

                return {
                    idPost: post.idPost,
                    imageUrl: post.imageUrl ?? "",
                    description: post.description ?? "",
                    participant: {
                        idParticipant: post.participant.idParticipant,
                        name: post.participant.name ?? "Sem nome",
                        email: post.participant.email ?? "Sem e-mail",
                        companyName: post.participant.companyName ?? "Sem empresa",
                        postPermission: post.participant.postPermission ?? 0,
                        AreaOfExpertise: post.participant.areaOfExpertise.map(area => ({
                            idArea: area.idArea,
                            name: area.name,
                        })),
                    },
                };
            });
        } catch (error: any) {
            if (error instanceof NotFoundError) {
                throw error;
            } else if (error.name === "QueryFailedError") {
                throw new DatabaseError("Falha ao buscar os posts no banco de dados!");
            } else {
                throw new TypeError("Erro inesperado ao buscar os posts");
            }
        }
    }

    async findByParticipantEmail(email: string): Promise<PostDTO[]> {
        try {
            const posts = await this.postRepository.find({
                where: { participant: { email } },
                relations: ["participant", "participant.areaOfExpertise"],
            });

            if (!posts || posts.length === 0) {
                throw new NotFoundError(`Nenhum post encontrado para o e-mail ${email}`);
            }

            return posts.map(post => {
                if (!post.participant.areaOfExpertise) {
                    throw new Error(`Participante com ID ${post.participant.idParticipant} não possui áreas de expertise.`);
                }

                return {
                    idPost: post.idPost,
                    imageUrl: post.imageUrl ?? "",
                    description: post.description ?? "",
                    participant: {
                        idParticipant: post.participant.idParticipant,
                        name: post.participant.name ?? "Sem nome",
                        email: post.participant.email ?? "Sem e-mail",
                        companyName: post.participant.companyName ?? "Sem empresa",
                        postPermission: post.participant.postPermission ?? 0,
                        AreaOfExpertise: post.participant.areaOfExpertise.map(area => ({
                            idArea: area.idArea,
                            name: area.name,
                        })),
                    },
                };
            });
        } catch (error: any) {
            if (error instanceof NotFoundError) {
                throw error;
            } else if (error.name === "QueryFailedError") {
                throw new DatabaseError("Erro ao buscar posts pelo e-mail do participante.");
            } else {
                throw new TypeError("Erro inesperado ao buscar os posts pelo e-mail");
            }
        }
    }

    async create(postData: CreatePostDTO): Promise<PostDTO> {
        try {
            const participant = await AppDataSource.getRepository(Participant).findOne({
                where: { idParticipant: postData.idParticipant },
                relations: ["areaOfExpertise"],
            });

            if (!participant) {
                throw new Error(
                    `Participante com o ID ${postData.idParticipant} não foi encontrado.`
                );
            }

            if (!participant.areaOfExpertise) {
                throw new Error(`Participante com o ID ${participant.idParticipant} não possui áreas de expertise.`);
            }

            const post = this.postRepository.create({
                participant: participant,
                imageUrl: postData.imageUrl ?? "",
                description: postData.description ?? "",
            });

            const savedPost = await this.postRepository.save(post);

            return {
                idPost: savedPost.idPost,
                imageUrl: savedPost.imageUrl ?? "",
                description: savedPost.description ?? "",
                participant: {
                    idParticipant: participant.idParticipant,
                    name: participant.name ?? "Sem nome",
                    email: participant.email ?? "Sem e-mail",
                    companyName: participant.companyName ?? "Sem empresa",
                    postPermission: participant.postPermission ?? 0,
                    AreaOfExpertise: participant.areaOfExpertise.map(area => ({
                        idArea: area.idArea,
                        name: area.name,
                    })),
                },
            };
        } catch (error: any) {
            if (error.name === "QueryFailedError") {
                throw new DatabaseError("Erro ao guardar o post no banco de dados.");
            } else {
                throw new TypeError("Erro inesperado ao guardar o post");
            }
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const result = await this.postRepository.delete(id);
            if (result.affected === 0) {
                throw new NotFoundError(`Post com ID ${id} não encontrado para exclusão.`);
            }
        } catch (error: any) {
            throw new DatabaseError("Erro ao excluir o post no banco de dados.");
        }
    }
}

export default new PostRepository();