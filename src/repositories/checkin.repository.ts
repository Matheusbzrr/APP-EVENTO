import { AppDataSource } from "../db/data-source";
import { CheckinDTO } from "../dtos/checkin/checkin.dto";
import { CreateCheckinDTO } from "../dtos/checkin/CreateCheckinDTO";
import { Checkin } from "../models/checkin";

class CheckinRepository {
    checkinRepository = AppDataSource.getRepository(Checkin);

    async findAll(): Promise<CheckinDTO[]> {
        try {
            const checkins = await this.checkinRepository.find({ relations: ["participant", "activity"] });
            return checkins.map(checkin => ({
                idCheckin: checkin.idCheckin,
                participantId: checkin.participant.idParticipant,
                activityId: checkin.activity.idActivity,
                checkinDateTime: checkin.checkinDateTime,
            }));
        } catch (error) {
            console.error("Erro ao buscar todos os checkins:", error);
            throw new Error("Falha ao retornar os Checkins!");
        }
    }

    async create(checkinData: CreateCheckinDTO): Promise<CheckinDTO> {
        try {
            const checkin = this.checkinRepository.create({
                participant: { idParticipant: checkinData.participantId },
                activity: { idActivity: checkinData.activityId },
            });
            const savedCheckin = await this.checkinRepository.save(checkin);
            return {
                idCheckin: savedCheckin.idCheckin,
                participantId: savedCheckin.participant.idParticipant,
                activityId: savedCheckin.activity.idActivity,
                checkinDateTime: savedCheckin.checkinDateTime,
            };
        } catch (error) {
            console.error("Erro ao criar checkin:", error);
            throw new Error("Falha ao criar o Checkin!");
        }
    }
}

export default new CheckinRepository();
