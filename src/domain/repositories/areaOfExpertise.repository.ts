import { AppDataSource } from "../../infrastructure/db/data-source";
import { AreaOfExpertise } from "../models/areaOfExpertise";

class AreaOfExpertiseRepository {
    async findAll(): Promise<AreaOfExpertise[]> {
        return await AppDataSource.getRepository(AreaOfExpertise).find();
    }

    async save(area: AreaOfExpertise): Promise<AreaOfExpertise> {
        return await AppDataSource.getRepository(AreaOfExpertise).save(area);
    }
}

export default new AreaOfExpertiseRepository();