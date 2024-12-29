import { AreaOfExpertiseDTO } from "../dtos/areaOfExpertise/AreaOfExpertiseDTO";
import { CreateAreaOfExpertiseDTO } from "../dtos/areaOfExpertise/CreateAreaOfExpertiseDTO";
import areaOfExpertiseRepository from "../repositories/areaOfExpertise.repository";
import { AreaOfExpertise } from "../models/areaOfExpertise";
import { ValidationError } from "../exceptions/validation-error";
import { NotFoundError } from "../exceptions/not-found-error";

class AreaOfExpertiseService {
    async getAllAreas(): Promise<AreaOfExpertiseDTO[]> {
        const areas = await areaOfExpertiseRepository.findAll();

        if (areas.length === 0) {
            throw new NotFoundError("Nenhuma área de especialização encontrada!");
        }

        return areas.map(area => ({
            idArea: area.idArea,
            name: area.name,
        }));
    }

    async createArea(areaData: CreateAreaOfExpertiseDTO): Promise<AreaOfExpertiseDTO> {
        // Validações
        if (!areaData.name || areaData.name.trim() === "") {
            throw new ValidationError("O campo 'nome' é obrigatório e não pode ser vazio.");
        }

        if (!/^[a-zA-Z\s\.]+$/.test(areaData.name)) {
            throw new ValidationError("O campo 'nome' contém caracteres inválidos.");
        }

        // Criação da entidade e salvamento
        const area = new AreaOfExpertise();
        area.name = areaData.name;

        const savedArea = await areaOfExpertiseRepository.save(area);

        return {
            idArea: savedArea.idArea,
            name: savedArea.name,
        };
    }
}

export default new AreaOfExpertiseService();