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
const validation_error_1 = require("../exceptions/validation-error");
const participant_1 = require("../models/participant");
const areaOfExpertise_1 = require("../models/areaOfExpertise");
class ParticipantRepository {
    constructor() {
        this.participantRepository = data_source_1.AppDataSource.getRepository(participant_1.Participant);
        this.areaOfExpertiseRepository = data_source_1.AppDataSource.getRepository(areaOfExpertise_1.AreaOfExpertise);
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!email) {
                    throw new validation_error_1.ValidationError("O e-mail é obrigatório.");
                }
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(email)) {
                    throw new validation_error_1.ValidationError("O e-mail fornecido não tem um formato válido.");
                }
                const participant = yield this.participantRepository.findOne({
                    where: { email },
                    relations: ["areaOfExpertise"],
                });
                if (!participant) {
                    throw new not_found_error_1.NotFoundError(`Participante com e-mail ${email} não encontrado.`);
                }
                return this.mapToParticipantDTO(participant);
            }
            catch (error) {
                this.handleRepositoryError(error, "buscar o Participante pelo e-mail");
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const participants = yield this.participantRepository.find({
                    relations: ["areaOfExpertise"],
                });
                if (!participants.length) {
                    throw new not_found_error_1.NotFoundError("Nenhum participante encontrado.");
                }
                return participants.map(this.mapToParticipantDTO);
            }
            catch (error) {
                this.handleRepositoryError(error, "buscar todos os Participantes");
            }
        });
    }
    create(participantData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, name, idArea, companyName, postPermission } = participantData;
                if (!email || !name) {
                    throw new validation_error_1.ValidationError("Nome e e-mail são obrigatórios.");
                }
                const participantExists = yield this.participantRepository.findOneBy({ email });
                if (participantExists) {
                    throw new conflict_error_1.ConflictError("Já existe um participante com esse e-mail.");
                }
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(email)) {
                    throw new validation_error_1.ValidationError("O e-mail fornecido não tem um formato válido.");
                }
                const areasOfExpertise = yield this.areaOfExpertiseRepository.findByIds(idArea);
                if (areasOfExpertise.length !== idArea.length) {
                    throw new validation_error_1.ValidationError("Uma ou mais áreas de expertise fornecidas são inválidas.");
                }
                const participant = this.participantRepository.create({
                    name,
                    email,
                    companyName,
                    postPermission,
                    areaOfExpertise: areasOfExpertise,
                });
                const savedParticipant = yield this.participantRepository.save(participant);
                return this.mapToParticipantDTO(savedParticipant);
            }
            catch (error) {
                this.handleRepositoryError(error, "criar o Participante");
            }
        });
    }
    mapToParticipantDTO(participant) {
        return {
            idParticipant: participant.idParticipant,
            name: participant.name,
            email: participant.email,
            companyName: participant.companyName,
            postPermission: participant.postPermission,
            AreaOfExpertise: participant.areaOfExpertise
                ? participant.areaOfExpertise.map((area) => ({
                    idArea: area.idArea,
                    name: area.name,
                }))
                : [],
        };
    }
    handleRepositoryError(error, action) {
        if (error instanceof conflict_error_1.ConflictError ||
            error instanceof validation_error_1.ValidationError ||
            error instanceof not_found_error_1.NotFoundError) {
            throw error;
        }
        else if (error.name === "QueryFailedError") {
            throw new data_base_error_1.DatabaseError(`Falha ao ${action} no banco de dados!`);
        }
        else {
            throw new TypeError(`Falha inesperada ao ${action}!`);
        }
    }
}
exports.default = new ParticipantRepository();
