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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const participant_service_1 = __importDefault(require("../../domain/services/participant.service"));
const validation_error_1 = require("../../domain/exceptions/validation-error");
const not_found_error_1 = require("../../domain/exceptions/not-found-error");
const data_base_error_1 = require("../../domain/exceptions/data-base-error");
const conflict_error_1 = require("../../domain/exceptions/conflict-error");
class ParticipantController {
    findByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            if (!email) {
                res.status(400).send({ message: "E-mail é obrigatório" });
                return;
            }
            try {
                const participant = yield participant_service_1.default.getParticipantByEmail(email);
                if (!participant) {
                    res.status(404).send({ message: "Participante não encontrado" });
                    return;
                }
                res.json(participant);
            }
            catch (err) {
                if (err instanceof validation_error_1.ValidationError) {
                    res.status(400).send({ message: err.message });
                }
                else if (err instanceof not_found_error_1.NotFoundError) {
                    res.status(404).send({ message: err.message });
                }
                else if (err instanceof data_base_error_1.DatabaseError) {
                    res.status(503).send({ message: err.message });
                }
                else if (err instanceof TypeError) {
                    res.status(500).send({ message: err.message });
                }
                else {
                    console.error("Erro ao buscar participante por e-mail:", err);
                    res.status(500).send({ message: "Erro ao buscar participante por e-mail" });
                }
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const participants = yield participant_service_1.default.getAllParticipants();
                res.json(participants);
            }
            catch (err) {
                if (err instanceof TypeError) {
                    res.status(500).send({ message: err.message });
                }
                else if (err instanceof not_found_error_1.NotFoundError) {
                    res.status(404).send({ message: err.message });
                }
                else if (err instanceof data_base_error_1.DatabaseError) {
                    res.status(503).send({
                        message: "Erro ao tentar listar todos os participantes",
                        details: err.message,
                    });
                }
                else {
                    console.error("Erro ao listar participantes:", err);
                    res.status(500).send({ message: "Erro ao tentar listar todos os participantes" });
                }
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const participantData = req.body;
                console.log("Dados recebidos para criação:", participantData);
                const participant = yield participant_service_1.default.createParticipant(participantData);
                res.status(201).json(participant);
            }
            catch (err) {
                if (err instanceof conflict_error_1.ConflictError) {
                    res.status(409).send({ error: err.message });
                }
                else if (err instanceof TypeError) {
                    res.status(500).send({ message: err.message });
                }
                else if (err instanceof validation_error_1.ValidationError) {
                    res.status(404).send({ message: err.message });
                }
                else if (err instanceof data_base_error_1.DatabaseError) {
                    res.status(503).send({ message: err.message });
                }
                else {
                    console.error("Erro ao criar participante:", err);
                    res.status(500).send({ message: "Erro ao criar participante" });
                }
            }
        });
    }
}
exports.default = new ParticipantController();
