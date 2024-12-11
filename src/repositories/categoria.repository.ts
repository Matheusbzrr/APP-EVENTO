import { AppDataSource } from "../db/data-source";
import { Categoria } from "../models/categoria";

class CategoriaRepository {
    categoriaRepository = AppDataSource.getRepository(Categoria);

    async buscarAll(): Promise<Categoria[]> {
        try {
            return await this.categoriaRepository.find(); 
        } catch (error) {
            console.error("Erro ao buscar todas as categorias:", error);
            throw new Error("Falha ao retornar os Categorias!");
        }
    }

    

}


export default new CategoriaRepository();