import { CheckinDTO } from "../dtos/checkin/checkin.dto";
import { CreateCheckinDTO } from "../dtos/checkin/CreateCheckinDTO";
import checkinRepository from "../repositories/checkin.repository";
import { Participant } from "../models/participant";
import { NotFoundError } from "../exceptions/not-found-error";
import { DatabaseError } from "../exceptions/data-base-error";
import { Checkin } from "../models/checkin";
import { AppDataSource } from "../../infrastructure/db/data-source";

class CheckinService {
    async getAllCheckins(): Promise<CheckinDTO[]> {
        const checkins = await checkinRepository.findAll();
        if (!checkins.length) {
            throw new NotFoundError("Nenhum checkin encontrado.");
        }
        return checkins.map(this.mapToDTO);
    }

    async createCheckin(checkinData: CreateCheckinDTO): Promise<CheckinDTO> {
        const participant = await AppDataSource.getRepository(Participant).findOne({
            where: { idParticipant: checkinData.idParticipant },
        });

        if (!participant) {
            throw new NotFoundError(`Participante com ID ${checkinData.idParticipant} não encontrado.`);
        }

        const checkin = new Checkin();
        checkin.participant = { idParticipant: checkinData.idParticipant } as any;
        checkin.activity = { idActivity: checkinData.idActivity } as any;

        const savedCheckin = await checkinRepository.save(checkin);
        return this.mapToDTO(savedCheckin);
    }

    async getCheckinsByParticipantId(idParticipant: number): Promise<CheckinDTO[]> {
        const checkins = await checkinRepository.findByParticipantId(idParticipant);
        if (!checkins.length) {
            throw new NotFoundError(`Nenhum checkin encontrado para o participante com ID ${idParticipant}.`);
        }
        return checkins.map(this.mapToDTO);
    }

    private mapToDTO(checkin: Checkin): CheckinDTO {
        return {
            idCheckin: checkin.idCheckin,
            participant: {
                idParticipant: checkin.participant.idParticipant,
                name: checkin.participant.name ?? "Sem nome",
                email: checkin.participant.email ?? "Sem e-mail",
                companyName: checkin.participant.companyName ?? "Sem empresa",
                position: checkin.participant.position ?? "Sem cargo",
                contact: checkin.participant.contact ?? "Sem contato",
                postPermission: checkin.participant.postPermission ?? 0,
                AreaOfExpertise: checkin.participant.areaOfExpertise?.map((area) => ({
                    idArea: area.idArea,
                    name: area.name,
                })) ?? [],
            },
            idActivity: checkin.activity?.idActivity ?? 0,
            checkinDateTime: checkin.checkinDateTime,
        };
    }
}

export default new CheckinService();