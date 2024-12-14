import { AppDataSource } from "../../infrastructure/db/data-source";
import { CreateLikeDTO } from "../dtos/like/createLike.dto";
import { LikeDTO } from "../dtos/like/like.dto";
import { Like } from "../models/like";
import { Participant } from "../models/participant";
import { NotFoundError, DatabaseError} from "../../infrastructure/utils/CustomErrors";

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
        } catch (error: any) {
            console.error("Erro ao buscar todos os likes:", error);

            if (error.name === "QueryFailedError") {
                throw new DatabaseError("Erro de consulta ao buscar likes.");
            }

            throw new DatabaseError("Erro ao acessar o banco de dados.");
        }
    }

    async create(likeData: CreateLikeDTO): Promise<LikeDTO> {
        try {
            const participant = await AppDataSource.getRepository(Participant).findOne({
                where: { idParticipant: likeData.idParticipant },
            });

            if (!participant) {
                throw new NotFoundError("Participante não encontrado.");
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
        } catch (error: any) {
            console.error("Erro ao criar like:", error);

            if (error instanceof NotFoundError) {
                throw error;
            }

            if (error.name === "QueryFailedError") {
                throw new DatabaseError("Erro ao dar like");
            }

            throw new DatabaseError("Erro inesperado ao dar o Like.");
        }
    }
}

export default new LikeRepository();