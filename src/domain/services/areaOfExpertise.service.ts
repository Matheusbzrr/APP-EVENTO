import { AreaOfExpertiseDTO } from "../dtos/areaOfExpertise/AreaOfExpertiseDTO";
import { CreateAreaOfExpertiseDTO } from "../dtos/areaOfExpertise/CreateAreaOfExpertiseDTO";
import areaOfExpertiseRepository from "../repositories/areaOfExpertise.repository";

class AreaOfExpertiseService {
    async getAllAreas(): Promise<AreaOfExpertiseDTO[]> {
        return await areaOfExpertiseRepository.findAll();
    }

    async createArea(areaData: CreateAreaOfExpertiseDTO): Promise<AreaOfExpertiseDTO> {
        return await areaOfExpertiseRepository.create(areaData);
    }
}

export default new AreaOfExpertiseService();
