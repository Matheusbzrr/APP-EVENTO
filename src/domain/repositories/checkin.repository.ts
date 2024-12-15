import { AppDataSource } from "../../infrastructure/db/data-source";
import { CheckinDTO } from "../dtos/checkin/checkin.dto";
import { CreateCheckinDTO } from "../dtos/checkin/CreateCheckinDTO";
import { DatabaseError } from "../exceptions/data-base-error";
import { NotFoundError } from "../exceptions/not-found-error";
import { RecordNotFoundError } from "../exceptions/record-not-found";
import { Checkin } from "../models/checkin";
import { Participant } from "../models/participant";
import { AreaOfExpertise } from "../models/areaOfExpertise"; 

class CheckinRepository {
    checkinRepository = AppDataSource.getRepository(Checkin);

    async findAll(): Promise<CheckinDTO[]> {
        try {
            const checkins = await this.checkinRepository
                .createQueryBuilder("checkin")
                .leftJoinAndSelect("checkin.participant", "participant")
                .leftJoinAndSelect("participant.areaOfExpertise", "areaOfExpertise") // Inclui área de expertise do participante
                .leftJoinAndSelect("checkin.activity", "activity")
                .getMany();
    
            if (!checkins.length) {
                throw new NotFoundError("Nenhum checkin encontrado.");
            }
    
            return checkins.map(checkin => ({
                idCheckin: checkin.idCheckin,
                participant: checkin.participant
                    ? {
                          idParticipant: checkin.participant.idParticipant,
                          name: checkin.participant.name ?? "Sem nome",
                          email: checkin.participant.email ?? "Sem e-mail",
                          companyName: checkin.participant.companyName ?? "Sem empresa",
                          postPermission: checkin.participant.postPermission ?? 0,
                          AreaOfExpertise: checkin.participant.areaOfExpertise
                              ? checkin.participant.areaOfExpertise.map((area: AreaOfExpertise) => ({
                                    idArea: area.idArea,
                                    name: area.name,
                                }))
                              : [],
                      }
                    : null,
                idActivity: checkin.activity?.idActivity ?? 0,
                checkinDateTime: checkin.checkinDateTime,
            })) as CheckinDTO[];
        } catch (error: any) {
            console.error("Erro ao buscar todos os checkins:", error);
            if (error instanceof NotFoundError) {
                throw error;
            } else if (error.name === "QueryFailedError") {
                throw new DatabaseError("Falha ao buscar os Checkins no banco de dados!");
            } else {
                throw new TypeError("Falha inesperada ao buscar os Checkins!");
            }
        }
    }

    async create(checkinData: CreateCheckinDTO): Promise<CheckinDTO> {
        try {
            const participant = await AppDataSource.getRepository(Participant).findOne({
                where: { idParticipant: checkinData.idParticipant },
            });

            if (!participant) {
                throw new RecordNotFoundError(
                    "Erro ao tentar achar o participante de id:",
                    checkinData.idParticipant.toString()
                );
            }

            const checkin = this.checkinRepository.create({
                participant: participant,
                activity: { idActivity: checkinData.idActivity },
            });

            const savedCheckin = await this.checkinRepository.save(checkin);

            return {
                idCheckin: savedCheckin.idCheckin,
                participant: savedCheckin.participant
                    ? {
                          idParticipant: savedCheckin.participant.idParticipant,
                          name: savedCheckin.participant.name ?? "Sem nome",
                          email: savedCheckin.participant.email ?? "Sem e-mail",
                          companyName: savedCheckin.participant.companyName ?? "Sem empresa",
                          postPermission: savedCheckin.participant.postPermission ?? 0,
                          AreaOfExpertise: savedCheckin.participant.areaOfExpertise
                              ? savedCheckin.participant.areaOfExpertise.map((area: AreaOfExpertise) => ({
                                    idArea: area.idArea,
                                    name: area.name,
                                }))
                              : [],
                      }
                    : null,
                idActivity: savedCheckin.activity?.idActivity ?? 0,
                checkinDateTime: savedCheckin.checkinDateTime,
            };
        } catch (error: any) {
            console.error("Erro ao criar checkin:", error);
            if (error instanceof RecordNotFoundError) {
                throw error;
            } else if (error.name === "QueryFailedError") {
                throw new DatabaseError("Falha ao criar o Checkin no banco de dados!");
            } else {
                throw new TypeError("Falha inesperada ao criar o Checkin!");
            }
        }
    }
}

export default new CheckinRepository();