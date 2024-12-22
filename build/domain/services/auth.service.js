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
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const participant_1 = require("../models/participant");
const data_source_1 = require("../../infrastructure/db/data-source");
class AuthService {
    constructor() {
        this.participantRepository = data_source_1.AppDataSource.getRepository(participant_1.Participant);
    }
    login(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data_source_1.AppDataSource.isInitialized) {
                throw new Error("Banco de dados não inicializado");
            }
            const participant = yield this.participantRepository.findOne({
                where: { email },
            });
            if (!participant) {
                return null;
            }
            const token = jsonwebtoken_1.default.sign({
                idParticipant: participant.idParticipant,
                email: participant.email,
                name: participant.name,
            }, process.env.JWT_SECRET || "minha-chave-secreta", { expiresIn: "1h" });
            return token;
        });
    }
}
exports.AuthService = AuthService;
exports.default = new AuthService();
