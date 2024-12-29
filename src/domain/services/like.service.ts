    import { LikeDTO } from "../dtos/like/like.dto";
    import { CreateLikeDTO } from "../dtos/like/createLike.dto";
    import likeRepository from "../repositories/like.repository";
    import { Participant } from "../models/participant";
    import { Post } from "../models/post";
    import { NotFoundError } from "../exceptions/not-found-error";
    import { CountLikeDTO } from "../dtos/like/countLike.dto";
    import { AppDataSource } from "../../infrastructure/db/data-source";
    import { Like } from "../models/like";

    class LikeService {
        findPostWithLikes(idPost: number) {
            throw new Error("Method not implemented.");
        }
        async getAllLikes(): Promise<LikeDTO[]> {
            const likes = await likeRepository.findAll();
            if (!likes.length) {
                throw new NotFoundError("Nenhum like encontrado.");
            }
        
            return likes.map((like) => ({
                idLike: like.idLike,
                participant: {
                    idParticipant: like.participant.idParticipant,
                    name: like.participant.name,
                    email: like.participant.email,
                    companyName: like.participant.companyName,
                    position: like.participant.position,
                    contact: like.participant.contact,
                    postPermission: like.participant.postPermission,
                    AreaOfExpertise: like.participant.areaOfExpertise?.map((area) => ({
                        idArea: area.idArea,
                        name: area.name,
                    })) ?? [], // Garante que seja um array vazio em caso de undefined
                },
                idPost: like.post.idPost,
            }));
        }
        async createLike(likeData: CreateLikeDTO): Promise<LikeDTO> {
            const participant = await AppDataSource.getRepository(Participant).findOne({
                where: { idParticipant: likeData.idParticipant },
                relations: ["areaOfExpertise"], // Inclui as relações necessárias
            });
        
            if (!participant) {
                throw new NotFoundError(`Participante com ID ${likeData.idParticipant} não encontrado.`);
            }
        
            const post = await AppDataSource.getRepository(Post).findOne({
                where: { idPost: likeData.idPost },
            });
        
            if (!post) {
                throw new NotFoundError(`Post com ID ${likeData.idPost} não encontrado.`);
            }
        
            const like = new Like();
            like.participant = participant;
            like.post = post;
        
            const savedLike = await likeRepository.save(like);
        
            return {
                idLike: savedLike.idLike,
                participant: {
                    idParticipant: participant.idParticipant,
                    name: participant.name,
                    email: participant.email,
                    companyName: participant.companyName,
                    position: participant.position,
                    contact: participant.contact,
                    postPermission: participant.postPermission,
                    AreaOfExpertise: participant.areaOfExpertise?.map((area) => ({
                        idArea: area.idArea,
                        name: area.name,
                    })) ?? [],
                },
                idPost: post.idPost,
            };
        }
        async countLikesPerPost(idPost: number): Promise<CountLikeDTO> {
            if (!idPost || isNaN(idPost)) {
                throw new Error("O ID da postagem deve ser um número válido.");
            }
        
            const result = await likeRepository.countLikesPerPost(idPost);
        
            if (!result) {
                throw new NotFoundError(`Nenhum like encontrado para o post com ID ${idPost}.`);
            }
        
            return result;
        }
        async deleteLike(idLike: number): Promise<void> {
            const rowsAffected = await likeRepository.delete(idLike);
    
            if (rowsAffected === 0) {
                throw new NotFoundError(`Like com ID ${idLike} não encontrado.`);
            }
        }
    }

    export default new LikeService();