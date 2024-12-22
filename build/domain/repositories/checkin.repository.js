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
const data_base_error_1 = require("../exceptions/data-base-error");
const not_found_error_1 = require("../exceptions/not-found-error");
const record_not_found_1 = require("../exceptions/record-not-found");
const checkin_1 = require("../models/checkin");
const participant_1 = require("../models/participant");
class CheckinRepository {
    constructor() {
        this.checkinRepository = data_source_1.AppDataSource.getRepository(checkin_1.Checkin);
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkins = yield this.checkinRepository
                    .createQueryBuilder("checkin")
                    .leftJoinAndSelect("checkin.participant", "participant")
                    .leftJoinAndSelect("participant.areaOfExpertise", "areaOfExpertise") // Inclui área de expertise do participante
                    .leftJoinAndSelect("checkin.activity", "activity")
                    .getMany();
                if (!checkins.length) {
                    throw new not_found_error_1.NotFoundError("Nenhum checkin encontrado.");
                }
                return checkins.map(checkin => {
                    var _a, _b, _c, _d, _e, _f;
                    return ({
                        idCheckin: checkin.idCheckin,
                        participant: checkin.participant
                            ? {
                                idParticipant: checkin.participant.idParticipant,
                                name: (_a = checkin.participant.name) !== null && _a !== void 0 ? _a : "Sem nome",
                                email: (_b = checkin.participant.email) !== null && _b !== void 0 ? _b : "Sem e-mail",
                                companyName: (_c = checkin.participant.companyName) !== null && _c !== void 0 ? _c : "Sem empresa",
                                postPermission: (_d = checkin.participant.postPermission) !== null && _d !== void 0 ? _d : 0,
                                AreaOfExpertise: checkin.participant.areaOfExpertise
                                    ? checkin.participant.areaOfExpertise.map((area) => ({
                                        idArea: area.idArea,
                                        name: area.name,
                                    }))
                                    : [],
                            }
                            : null,
                        idActivity: (_f = (_e = checkin.activity) === null || _e === void 0 ? void 0 : _e.idActivity) !== null && _f !== void 0 ? _f : 0,
                        checkinDateTime: checkin.checkinDateTime,
                    });
                });
            }
            catch (error) {
                console.error("Erro ao buscar todos os checkins:", error);
                if (error instanceof not_found_error_1.NotFoundError) {
                    throw error;
                }
                else if (error.name === "QueryFailedError") {
                    throw new data_base_error_1.DatabaseError("Falha ao buscar os Checkins no banco de dados!");
                }
                else {
                    throw new TypeError("Falha inesperada ao buscar os Checkins!");
                }
            }
        });
    }
    create(checkinData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            try {
                const participant = yield data_source_1.AppDataSource.getRepository(participant_1.Participant).findOne({
                    where: { idParticipant: checkinData.idParticipant },
                });
                if (!participant) {
                    throw new record_not_found_1.RecordNotFoundError("Erro ao tentar achar o participante de id:", checkinData.idParticipant.toString());
                }
                const checkin = this.checkinRepository.create({
                    participant: participant,
                    activity: { idActivity: checkinData.idActivity },
                });
                const savedCheckin = yield this.checkinRepository.save(checkin);
                return {
                    idCheckin: savedCheckin.idCheckin,
                    participant: savedCheckin.participant
                        ? {
                            idParticipant: savedCheckin.participant.idParticipant,
                            name: (_a = savedCheckin.participant.name) !== null && _a !== void 0 ? _a : "Sem nome",
                            email: (_b = savedCheckin.participant.email) !== null && _b !== void 0 ? _b : "Sem e-mail",
                            companyName: (_c = savedCheckin.participant.companyName) !== null && _c !== void 0 ? _c : "Sem empresa",
                            postPermission: (_d = savedCheckin.participant.postPermission) !== null && _d !== void 0 ? _d : 0,
                            AreaOfExpertise: savedCheckin.participant.areaOfExpertise
                                ? savedCheckin.participant.areaOfExpertise.map((area) => ({
                                    idArea: area.idArea,
                                    name: area.name,
                                }))
                                : [],
                        }
                        : null,
                    idActivity: (_f = (_e = savedCheckin.activity) === null || _e === void 0 ? void 0 : _e.idActivity) !== null && _f !== void 0 ? _f : 0,
                    checkinDateTime: savedCheckin.checkinDateTime,
                };
            }
            catch (error) {
                console.error("Erro ao criar checkin:", error);
                if (error instanceof record_not_found_1.RecordNotFoundError) {
                    throw error;
                }
                else if (error.name === "QueryFailedError") {
                    throw new data_base_error_1.DatabaseError("Falha ao criar o Checkin no banco de dados!");
                }
                else {
                    throw new TypeError("Falha inesperada ao criar o Checkin!");
                }
            }
        });
    }
}
exports.default = new CheckinRepository();
