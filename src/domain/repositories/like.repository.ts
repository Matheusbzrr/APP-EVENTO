import { AppDataSource } from "../../infrastructure/db/data-source";
import { CreateLikeDTO } from "../dtos/like/createLike.dto";
import { LikeDTO } from "../dtos/like/like.dto";
import { DatabaseError } from "../exceptions/data-base-error";
import { NotFoundError } from "../exceptions/not-found-error";
import { RecordNotFoundError } from "../exceptions/record-not-found";
import { Like } from "../models/like";
import { Participant } from "../models/participant";
import { Post } from "../models/post";
import { AreaOfExpertise } from "../models/areaOfExpertise";
import { CountLikeDTO } from "../dtos/like/countLike.dto";

class LikeRepository {
    likeRepository = AppDataSource.getRepository(Like);

    async findAll(): Promise<LikeDTO[]> {
        try {
            const likes = await this.likeRepository.find({
                relations: [
                    "participant",
                    "participant.areaOfExpertise",
                    "post",
                ],
            });

            if (!likes || likes.length === 0) {
                throw new NotFoundError("Nenhum like encontrado.");
            }

            return likes.map(like => ({
                idLike: like.idLike,
                participant: like.participant
                    ? {
                          idParticipant: like.participant.idParticipant,
                          name: like.participant.name ?? "Sem nome",
                          email: like.participant.email ?? "Sem e-mail",
                          companyName: like.participant.companyName ?? "Sem empresa",
                          postPermission: like.participant.postPermission ?? 0,
                          AreaOfExpertise: like.participant.areaOfExpertise?.map((area: AreaOfExpertise) => ({
                              idArea: area.idArea,
                              name: area.name,
                          })) ?? [],
                      }
                    : null,
                idPost: like.post?.idPost ?? 0,
            })) as LikeDTO[];
        } catch (error: any) {
            console.error("Erro ao buscar todos os likes:", error);
            if (error instanceof NotFoundError) {
                throw error;
            } else if (error.name === "QueryFailedError") {
                throw new DatabaseError("Falha ao buscar os Likes no banco de dados!");
            } else {
                throw new TypeError("Erro inesperado ao buscar todos os likes!");
            }
        }
    }

    async create(likeData: CreateLikeDTO): Promise<LikeDTO> {
        try {
            const participant = await AppDataSource.getRepository(Participant).findOne({
                where: { idParticipant: likeData.idParticipant },
                relations: ["areaOfExpertise"],
            });

            if (!participant) {
                throw new RecordNotFoundError(
                    "Erro ao tentar achar o participante de ID:",
                    likeData.idParticipant.toString()
                );
            }

            const post = await AppDataSource.getRepository(Post).findOne({
                where: { idPost: likeData.idPost },
            });

            if (!post) {
                throw new RecordNotFoundError(
                    "Erro ao tentar achar o post de ID:",
                    likeData.idPost.toString()
                );
            }

            const like = this.likeRepository.create({
                participant,
                post,
            });

            const savedLike = await this.likeRepository.save(like);

            return {
                idLike: savedLike.idLike,
                participant: {
                    idParticipant: participant.idParticipant,
                    name: participant.name ?? "Sem nome",
                    email: participant.email ?? "Sem e-mail",
                    companyName: participant.companyName ?? "Sem empresa",
                    postPermission: participant.postPermission ?? 0,
                    AreaOfExpertise: participant.areaOfExpertise?.map(area => ({
                        idArea: area.idArea,
                        name: area.name,
                    })) ?? [],
                },
                idPost: post.idPost,
            };
        } catch (error: any) {
            console.error("Erro ao criar like:", error);
            if (error instanceof RecordNotFoundError) {
                throw error;
            } else if (error.name === "QueryFailedError") {
                throw new DatabaseError("Erro ao guardar o Like no banco de dados.");
            } else {
                throw new TypeError("Erro inesperado ao guardar o Like");
            }
        }
    }

    
    async CountLikesPerPost(idPost: number): Promise<CountLikeDTO> {
        try {
            const result = await this.likeRepository.query(
                'CALL CountLikesPerPostFiltre(?)',
                [idPost]
            );
            
            return result[0] as CountLikeDTO; 
        } catch (error: any) {
            console.error('Erro ao contar likes por post:', error);
            
            return {
                idPost: idPost,
                LikeCount: 0, 
            };
        }
    }
    


}

export default new LikeRepository;