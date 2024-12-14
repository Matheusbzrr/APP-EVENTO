import { AppDataSource } from "../../infrastructure/db/data-source";
import { CreateLikeDTO } from "../dtos/like/createLike.dto";
import { LikeDTO } from "../dtos/like/like.dto";
import { Like } from "../models/like";
import { Participant } from "../models/participant";

class LikeRepository {
    likeRepository = AppDataSource.getRepository(Like);

    async findAll(): Promise<LikeDTO[]> {
        try {
            const likes = await this.likeRepository.find({
                relations: ["participant", "activity"],
            });

            return likes.map(like => ({
                idLike: like.idLike,
                participant: like.participant ? {
                    idParticipant: like.participant.idParticipant,
                    name: like.participant.name ?? "Sem nome",
                    email: like.participant.email ?? "Sem e-mail",
                    companyName: like.participant.companyName ?? "Sem empresa",
                    postPermission: like.participant.postPermission ?? 0,
                } : null,
                idActivity: like.activity?.idActivity ?? 0,
            })) as LikeDTO[];
        } catch (error) {
            console.error("Erro ao buscar todos os likes:", error);
            throw new Error("Falha ao retornar os Likes!");
        }
    }

    async create(likeData: CreateLikeDTO): Promise<LikeDTO> {
        try {
            const participant = await AppDataSource.getRepository(Participant).findOne({
                where: { idParticipant: likeData.idParticipant },
            });

            if (!participant) {
                throw new Error("Participante não encontrado");
            }

            const like = this.likeRepository.create({
                participant: participant,
                activity: { idActivity: likeData.idActivity },
            });

            const savedLike = await this.likeRepository.save(like);

            return {
                idLike: savedLike.idLike,
                participant: savedLike.participant ? {
                    idParticipant: savedLike.participant.idParticipant,
                    name: savedLike.participant.name ?? "Sem nome",
                    email: savedLike.participant.email ?? "Sem e-mail",
                    companyName: savedLike.participant.companyName ?? "Sem empresa",
                    postPermission: savedLike.participant.postPermission ?? 0,
                } : null,
                idActivity: savedLike.activity?.idActivity ?? 0,
            };
        } catch (error) {
            console.error("Erro ao criar like:", error);
            throw new Error("Falha ao criar o Like!");
        }
    }
}

export default new LikeRepository();