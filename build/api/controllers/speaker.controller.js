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
const speaker_service_1 = __importDefault(require("../../domain/services/speaker.service"));
const data_base_error_1 = require("../../domain/exceptions/data-base-error");
const not_found_error_1 = require("../../domain/exceptions/not-found-error");
const conflict_error_1 = require("../../domain/exceptions/conflict-error");
class SpeakerController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const speakers = yield speaker_service_1.default.getAllSpeakers();
                res.json(speakers);
            }
            catch (err) {
                if (err instanceof data_base_error_1.DatabaseError) {
                    res.status(503).send({ message: err.message });
                }
                else if (err instanceof not_found_error_1.NotFoundError) {
                    res.status(404).send({ message: err.message });
                }
                else if (err instanceof TypeError) {
                    res.status(500).send({ message: err.message });
                }
                else {
                    res.status(500).send({ message: "Erro inesperado ao tentar listar todos os palestrantes" });
                }
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const speakerData = req.body;
                const speaker = yield speaker_service_1.default.createSpeaker(speakerData);
                res.status(201).json(speaker);
            }
            catch (err) {
                if (err instanceof conflict_error_1.ConflictError) {
                    res.status(409).send({ message: err.message });
                }
                else if (err instanceof data_base_error_1.DatabaseError) {
                    res.status(500).send({ message: err.message });
                }
                else if (err instanceof not_found_error_1.NotFoundError) {
                    res.status(404).send({ message: err.message });
                }
                else if (err instanceof TypeError) {
                    res.status(500).send({ message: err.message });
                }
                else {
                    res.status(500).send({
                        message: "Erro ao criar speaker",
                        error: err.message || "Erro desconhecido"
                    });
                }
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idSpeaker = parseInt(req.params.idSpeaker, 10);
                yield speaker_service_1.default.deleteSpeaker(idSpeaker);
                res.status(204).send();
            }
            catch (err) {
                if (err instanceof not_found_error_1.NotFoundError) {
                    res.status(404).send({ message: err.message });
                }
                else if (err instanceof data_base_error_1.DatabaseError) {
                    res.status(500).send({ message: err.message });
                }
                else {
                    res.status(500).send({ message: "Erro ao deletar speaker" });
                }
            }
        });
    }
}
exports.default = SpeakerController;
