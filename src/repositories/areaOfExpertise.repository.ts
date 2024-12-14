import { AppDataSource } from "../db/data-source";
import { AreaOfExpertise } from "../domain/models/areaOfExpertise";
import { CreateAreaOfExpertiseDTO } from "../dtos/areaOfExpertise/CreateAreaOfExpertiseDTO";
import { AreaOfExpertiseDTO } from "../dtos/areaOfExpertise/AreaOfExpertiseDTO";

class AreaOfExpertiseRepository {
    areaOfExpertiseRepository = AppDataSource.getRepository(AreaOfExpertise);

    async findAll(): Promise<AreaOfExpertiseDTO[]> {
        try {
            const areas = await this.areaOfExpertiseRepository.find();
            return areas.map(area => ({
                idArea: area.idArea,
                name: area.name,
            }));
        } catch (error) {
            console.error("Erro ao buscar todas as áreas de especialização:", error);
            throw new Error("Falha ao retornar as Áreas de Especialização!");
        }
    }

    async create(areaData: CreateAreaOfExpertiseDTO): Promise<AreaOfExpertiseDTO> {
        try {
            const area = this.areaOfExpertiseRepository.create(areaData);
            const savedArea = await this.areaOfExpertiseRepository.save(area);
            return {
                idArea: savedArea.idArea,
                name: savedArea.name,
            };
        } catch (error) {
            console.error("Erro ao criar área de especialização:", error);
            throw new Error("Falha ao criar a Área de Especialização!");
        }
    }
}

export default new AreaOfExpertiseRepository();
