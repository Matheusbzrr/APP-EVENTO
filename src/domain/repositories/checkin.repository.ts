import { AppDataSource } from "../../infrastructure/db/data-source";
import { CheckinDTO } from "../dtos/checkin/checkin.dto";
import { CreateCheckinDTO } from "../dtos/checkin/CreateCheckinDTO";
import { Checkin } from "../models/checkin";
import { Participant } from "../models/participant"; 

class CheckinRepository {
    checkinRepository = AppDataSource.getRepository(Checkin);

    async findAll(): Promise<CheckinDTO[]> {
        try {
            const checkins = await this.checkinRepository.find({
                relations: ["participant", "activity"],
            });

            return checkins.map(checkin => ({
                idCheckin: checkin.idCheckin,
                participant: checkin.participant ? {
                    idParticipant: checkin.participant.idParticipant,
                    name: checkin.participant.name ?? "Sem nome",
                    email: checkin.participant.email ?? "Sem e-mail",
                    companyName: checkin.participant.companyName ?? "Sem empresa",
                    postPermission: checkin.participant.postPermission ?? 0,
                } : null,  
                idActivity: checkin.activity?.idActivity ?? 0,
                checkinDateTime: checkin.checkinDateTime,
            })) as CheckinDTO[]; 
        } catch (error) {
            console.error("Erro ao buscar todos os checkins:", error);
            throw new Error("Falha ao retornar os Checkins!");
        }
    }

    async create(checkinData: CreateCheckinDTO): Promise<CheckinDTO> {
        try {
            
            const participant = await AppDataSource.getRepository(Participant).findOne({
                where: { idParticipant: checkinData.idParticipant },
            });

            if (!participant) {
                throw new Error("Participante não encontrado");
            }

            const checkin = this.checkinRepository.create({
                participant: participant, 
                activity: { idActivity: checkinData.idActivity },
            });

            const savedCheckin = await this.checkinRepository.save(checkin);

            return {
                idCheckin: savedCheckin.idCheckin,
                participant: savedCheckin.participant ? {
                    idParticipant: savedCheckin.participant.idParticipant,
                    name: savedCheckin.participant.name ?? "Sem nome",
                    email: savedCheckin.participant.email ?? "Sem e-mail",
                    companyName: savedCheckin.participant.companyName ?? "Sem empresa",
                    postPermission: savedCheckin.participant.postPermission ?? 0,
                } : null,  
                idActivity: savedCheckin.activity?.idActivity ?? 0,
                checkinDateTime: savedCheckin.checkinDateTime,
            };
        } catch (error) {
            console.error("Erro ao criar checkin:", error);
            throw new Error("Falha ao criar o Checkin!");
        }
    }
}

export default new CheckinRepository();