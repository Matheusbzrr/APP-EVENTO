"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../infrastructure/db/data-source");
const areaOfExpertise_1 = require("../models/areaOfExpertise");
const data_base_error_1 = require("../../domain/exceptions/data-base-error");
const validation_error_1 = require("../../domain/exceptions/validation-error");
const not_found_error_1 = require("../../domain/exceptions/not-found-error");
class AreaOfExpertiseRepository {
    constructor() {
        this.areaOfExpertiseRepository = data_source_1.AppDataSource.getRepository(areaOfExpertise_1.AreaOfExpertise);
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const areas = yield this.areaOfExpertiseRepository.find();
                if (areas.length === 0) {
                    throw new not_found_error_1.NotFoundError("Nenhuma área de especialização encontrada!");
                }
                return areas.map(area => ({
                    idArea: area.idArea,
                    name: area.name,
                }));
            }
            catch (error) {
                console.error("Erro ao buscar todas as áreas de especialização:", error);
                if (error instanceof not_found_error_1.NotFoundError) {
                    throw error;
                }
                else if (error.nome === "QueryFailedError") {
                    console.error("Erro no banco de dados:", error.message);
                    throw new data_base_error_1.DatabaseError("Falha ao tentar acessar as Atividades! Por favor, tente novamente.");
                }
                else {
                    throw new TypeError("Falha inesperada ao buscar todas as áreas de especialização!");
                }
            }
        });
    }
    create(areaData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!areaData.name || areaData.name.trim() === "") {
                    throw new validation_error_1.ValidationError("O campo 'nome' é obrigatório e não pode ser vazio.");
                }
                if (!/^[a-zA-Z\s\.]+$/.test(areaData.name)) {
                    throw new validation_error_1.ValidationError("O campo 'nome' contém caracteres inválidos.");
                }
                const area = this.areaOfExpertiseRepository.create(areaData);
                const savedArea = yield this.areaOfExpertiseRepository.save(area);
                return {
                    idArea: savedArea.idArea,
                    name: savedArea.name,
                };
            }
            catch (error) {
                console.error("Erro ao criar área de especialização:", error);
                if (error instanceof validation_error_1.ValidationError) {
                    throw error;
                }
                else if (error.nome === "QueryFailedError") {
                    throw new data_base_error_1.DatabaseError("Falha ao criar a Área de Especialização no banco de dados!");
                }
                else {
                    throw new TypeError("Falha inesperada ao criar a área de Especialização!");
                }
            }
        });
    }
}
exports.default = new AreaOfExpertiseRepository();
