import { AppDataSource } from "../../infrastructure/db/data-source";
import { AreaOfExpertise } from "../models/areaOfExpertise";
import { CreateAreaOfExpertiseDTO } from "../dtos/areaOfExpertise/CreateAreaOfExpertiseDTO";
import { AreaOfExpertiseDTO } from "../dtos/areaOfExpertise/AreaOfExpertiseDTO";
import { DatabaseError } from "../../domain/exceptions/data-base-error";
import { ValidationError } from "../../domain/exceptions/validation-error";
import { NotFoundError } from "../../domain/exceptions/not-found-error";

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
        } catch (error: any) {
            console.error("Erro ao buscar todas as áreas de especialização:", error);
            if (error instanceof NotFoundError) {
                throw error;
            }
            else if (error.nome === "QueryFailedError") {
                console.error("Erro no banco de dados:", error.message);
                throw new DatabaseError("Falha ao tentar acessar as Atividades! Por favor, tente novamente.");
            } else{
                throw new TypeError("Falha inesperada ao buscar todas as áreas de especialização!");
            }
        }
    }

    async create(areaData: CreateAreaOfExpertiseDTO): Promise<AreaOfExpertiseDTO> {
        try {

            if (!areaData.name || areaData.name.trim() === "") {
                throw new ValidationError("O campo 'nome' é obrigatório e não pode ser vazio.");
            }

            if (!/^[a-zA-Z\s\.]+$/.test(areaData.name)) {
                throw new ValidationError("O campo 'nome' contém caracteres inválidos.");
            }
            
            const area = this.areaOfExpertiseRepository.create(areaData);
            const savedArea = await this.areaOfExpertiseRepository.save(area);
            return {
                idArea: savedArea.idArea,
                name: savedArea.name,
            };
        } catch (error: any) {
            console.error("Erro ao criar área de especialização:", error);
            if (error instanceof ValidationError) {
                throw error;
            } else if (error.nome === "QueryFailedError") {
                throw new DatabaseError("Falha ao criar a Área de Especialização no banco de dados!");
            } else{
                throw new TypeError("Falha inesperada ao criar a área de Especialização!");
            }
            
        }
    }
}

export default new AreaOfExpertiseRepository();
