import areaOfExpertiseRepository from "../repositories/areaOfExpertise.repository";
import { CreateAreaOfExpertiseDTO } from "../dtos/areaOfExpertise/CreateAreaOfExpertiseDTO";
import { AreaOfExpertiseDTO } from "../dtos/areaOfExpertise/AreaOfExpertiseDTO";

class AreaOfExpertiseService {
    async getAllAreas(): Promise<AreaOfExpertiseDTO[]> {
        return await areaOfExpertiseRepository.findAll();
    }

    async createArea(areaData: CreateAreaOfExpertiseDTO): Promise<AreaOfExpertiseDTO> {
        return await areaOfExpertiseRepository.create(areaData);
    }
}

export default new AreaOfExpertiseService();
