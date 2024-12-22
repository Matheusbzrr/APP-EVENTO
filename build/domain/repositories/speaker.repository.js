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
const conflict_error_1 = require("../exceptions/conflict-error");
const data_base_error_1 = require("../exceptions/data-base-error");
const not_found_error_1 = require("../exceptions/not-found-error");
const speaker_1 = require("../models/speaker");
class SpeakerRepository {
    constructor() {
        this.speakerRepository = data_source_1.AppDataSource.getRepository(speaker_1.Speaker);
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const speakers = yield this.speakerRepository.find();
                if (!speakers.length) {
                    throw new not_found_error_1.NotFoundError("Nenhum palestrante encontrado!");
                }
                return speakers.map(speaker => ({
                    idSpeaker: speaker.idSpeaker,
                    name: speaker.name,
                    description: speaker.description || "Sem descrição",
                    role: speaker.role || "Sem função",
                    company: speaker.company || "Sem empresa",
                }));
            }
            catch (error) {
                console.error("Erro ao buscar palestrantes:", error);
                if (error instanceof not_found_error_1.NotFoundError) {
                    throw error;
                }
                else if (error.name === "QueryFailedError") {
                    throw new data_base_error_1.DatabaseError("Falha ao buscar os palestrantes no banco de dados!");
                }
                else {
                    throw new TypeError("Falha inesperada ao buscar todos os palestrantes!");
                }
            }
        });
    }
    create(speakerData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingSpeaker = yield this.speakerRepository.findOneBy({ name: speakerData.name });
                if (existingSpeaker) {
                    throw new conflict_error_1.ConflictError("Palestrante com este nome já existe!");
                }
                const speaker = this.speakerRepository.create(speakerData);
                const savedSpeaker = yield this.speakerRepository.save(speaker);
                return {
                    idSpeaker: savedSpeaker.idSpeaker,
                    name: savedSpeaker.name,
                    description: savedSpeaker.description || "Sem descrição",
                    role: savedSpeaker.role || "Sem função",
                    company: savedSpeaker.company || "Sem empresa",
                };
            }
            catch (error) {
                console.error("Erro ao criar palestrante:", error);
                if (error instanceof conflict_error_1.ConflictError) {
                    throw error;
                }
                else if (error.name === "QueryFailedError") {
                    throw new data_base_error_1.DatabaseError("Falha ao criar o palestrante no banco de dados!");
                }
                else {
                    throw new TypeError("Falha inesperada ao criar o palestrante!");
                }
            }
        });
    }
    delete(idSpeaker) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.speakerRepository.delete(idSpeaker);
                if (result.affected === 0) {
                    throw new not_found_error_1.NotFoundError("Palestrante não encontrado ou já foi excluído!");
                }
            }
            catch (error) {
                console.error("Erro ao deletar palestrante:", error);
                if (error instanceof not_found_error_1.NotFoundError) {
                    throw error;
                }
                else if (error.name === "QueryFailedError") {
                    throw new data_base_error_1.DatabaseError("Falha ao deletar o palestrante no banco de dados!");
                }
                else {
                    throw new TypeError("Falha inesperada ao deletar o palestrante!");
                }
            }
        });
    }
}
exports.default = new SpeakerRepository();
