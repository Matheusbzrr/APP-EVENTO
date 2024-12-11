// src/repositories/categoria.repository.ts
import { AppDataSource } from "../db/data-source";
import { CategoriaDTO } from "../dtos/categoria/categoria.dto";
import { CreateCategoriaDTO } from "../dtos/categoria/CreateCategoriaDTO";
import { Categoria } from "../models/categoria";

class CategoriaRepository {
    categoriaRepository = AppDataSource.getRepository(Categoria);

    async findAll(): Promise<CategoriaDTO[]> {
        try {
            const categorias = await this.categoriaRepository.find();
            return categorias.map(categoria => ({
                idCategoria: categoria.idCategoria,
                nome: categoria.nome,
                descricao: categoria.descricao,
            }));
        } catch (error) {
            console.error("Erro ao buscar todas as categorias:", error);
            throw new Error("Falha ao retornar os Categorias!");
        }
    }

    async create(categoriaData: CreateCategoriaDTO): Promise<CategoriaDTO> {
        try {
            const categoria = this.categoriaRepository.create(categoriaData); 
            const savedCategoria = await this.categoriaRepository.save(categoria); 
            return {
                idCategoria: savedCategoria.idCategoria,
                nome: savedCategoria.nome,
                descricao: savedCategoria.descricao,
            };
        } catch (error) {
            console.error("Erro ao criar categoria:", error);
            throw new Error("Falha ao criar a Categoria!");
        }
    }
}

export default new CategoriaRepository();
