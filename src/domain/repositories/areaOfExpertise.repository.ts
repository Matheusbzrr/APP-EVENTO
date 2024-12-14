import { AppDataSource } from "../../infrastructure/db/data-source";
import { AreaOfExpertise } from "../models/areaOfExpertise";
import { CreateAreaOfExpertiseDTO } from "../dtos/areaOfExpertise/CreateAreaOfExpertiseDTO";
import { AreaOfExpertiseDTO } from "../dtos/areaOfExpertise/AreaOfExpertiseDTO";
import { DatabaseError, ValidationError, NotFoundError } from"../../infrastructure/utils/CustomErrors";

class AreaOfExpertiseRepository {
    areaOfExpertiseRepository = AppDataSource.getRepository(AreaOfExpertise);

    async findAll(): Promise<AreaOfExpertiseDTO[]> {
        try {
            const areas = await this.areaOfExpertiseRepository.find();

            if (areas.length === 0) {
                throw new NotFoundError("Nenhuma área de especialização encontrada!");
            }

            return areas.map(area => ({
                idArea: area.idArea,
                name: area.name,
            }));
        } catch (error) {
            console.error("Erro ao buscar todas as áreas de especialização:", error);
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError("Falha ao retornar as Áreas de Especialização!");
        }
    }

    async create(areaData: CreateAreaOfExpertiseDTO): Promise<AreaOfExpertiseDTO> {
        try {

            if (!areaData.name || areaData.name.trim() === "") {
                throw new ValidationError("O campo 'name' é obrigatório e não pode ser vazio.");
            }

            const area = this.areaOfExpertiseRepository.create(areaData);
            const savedArea = await this.areaOfExpertiseRepository.save(area);
            return {
                idArea: savedArea.idArea,
                name: savedArea.name,
            };
        } catch (error) {
            console.error("Erro ao criar área de especialização:", error);
            if (error instanceof ValidationError) {
                throw error;
            }
            throw new DatabaseError("Falha ao criar a Área de Especialização!");
        }
    }
}

export default new AreaOfExpertiseRepository();
