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
const activity_1 = require("../models/activity");
const speaker_1 = require("../models/speaker");
const data_base_error_1 = require("../exceptions/data-base-error");
const not_found_error_1 = require("../exceptions/not-found-error");
const validation_error_1 = require("../exceptions/validation-error");
const areaOfExpertise_1 = require("../models/areaOfExpertise");
class ActivityRepository {
    constructor() {
        this.activityRepository = data_source_1.AppDataSource.getRepository(activity_1.Activity);
        this.speakerRepository = data_source_1.AppDataSource.getRepository(speaker_1.Speaker);
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activities = yield this.activityRepository
                    .createQueryBuilder("activity")
                    .leftJoinAndSelect("activity.checkins", "checkin")
                    .leftJoinAndSelect("checkin.participant", "participant")
                    .leftJoinAndSelect("participant.areaOfExpertise", "participantAreaOfExpertise")
                    .leftJoinAndSelect("activity.speaker", "speaker")
                    .leftJoinAndSelect("activity.areaOfExpertise", "activityAreaOfExpertise")
                    .getMany();
                if (!activities.length) {
                    throw new not_found_error_1.NotFoundError("Nenhuma atividade disponível no momento.");
                }
                return activities.map(activity => {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                    return ({
                        idActivity: activity.idActivity,
                        title: (_a = activity.title) !== null && _a !== void 0 ? _a : "Sem título",
                        description: (_b = activity.description) !== null && _b !== void 0 ? _b : "Sem descrição",
                        time: (_c = activity.time) !== null && _c !== void 0 ? _c : "00:00",
                        date: (_d = activity.date) !== null && _d !== void 0 ? _d : new Date("2000-01-01"),
                        location: (_e = activity.location) !== null && _e !== void 0 ? _e : "Sem local",
                        checkins: activity.checkins.map(checkin => {
                            var _a, _b, _c, _d, _e, _f, _g, _h;
                            return ({
                                idCheckin: checkin.idCheckin,
                                participant: checkin.participant
                                    ? {
                                        idParticipant: checkin.participant.idParticipant,
                                        name: (_a = checkin.participant.name) !== null && _a !== void 0 ? _a : "Sem nome",
                                        email: (_b = checkin.participant.email) !== null && _b !== void 0 ? _b : "Sem e-mail",
                                        companyName: (_c = checkin.participant.companyName) !== null && _c !== void 0 ? _c : "Sem empresa",
                                        postPermission: (_d = checkin.participant.postPermission) !== null && _d !== void 0 ? _d : 0,
                                        areaOfExpertise: (_f = (_e = checkin.participant.areaOfExpertise) === null || _e === void 0 ? void 0 : _e.map(area => ({
                                            idArea: area.idArea,
                                            name: area.name,
                                        }))) !== null && _f !== void 0 ? _f : [],
                                    }
                                    : null,
                                idActivity: (_h = (_g = checkin.activity) === null || _g === void 0 ? void 0 : _g.idActivity) !== null && _h !== void 0 ? _h : 0,
                                checkinDateTime: checkin.checkinDateTime,
                            });
                        }),
                        speaker: (_g = (_f = activity.speaker) === null || _f === void 0 ? void 0 : _f.map(speaker => {
                            var _a;
                            return ({
                                idSpeaker: speaker.idSpeaker,
                                name: (_a = speaker.name) !== null && _a !== void 0 ? _a : "Sem nome",
                                description: speaker.description || "Sem descrição",
                                role: speaker.role || "Sem função",
                                company: speaker.company || "Sem empresa",
                            });
                        })) !== null && _g !== void 0 ? _g : [],
                        areaOfExpertise: (_j = (_h = activity.areaOfExpertise) === null || _h === void 0 ? void 0 : _h.map(area => ({
                            idArea: area.idArea,
                            name: area.name,
                        }))) !== null && _j !== void 0 ? _j : [],
                    });
                });
            }
            catch (error) {
                if (error instanceof TypeError) {
                    throw new TypeError("Erro interno no servidor. Por favor, tente novamente mais tarde.");
                }
                else if (error.name === "QueryFailedError") {
                    throw new data_base_error_1.DatabaseError("Falha ao tentar acessar as Atividades! Por favor, tente novamente.");
                }
                else if (error instanceof not_found_error_1.NotFoundError) {
                    throw error;
                }
                else {
                    throw new Error("Erro desconhecido. Por favor, entre em contato com o suporte.");
                }
            }
        });
    }
    create(activityData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            try {
                if (!activityData.title || !activityData.date || !activityData.time || !activityData.location || !activityData.speakerId || !activityData.idArea) {
                    throw new validation_error_1.ValidationError("Dados obrigatórios faltando: título, data, hora, localização, palestrantes ou áreas de expertise.");
                }
                if (isNaN(new Date(activityData.date).getTime())) {
                    throw new validation_error_1.ValidationError("O campo 'data' deve ser uma data válida.");
                }
                if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(activityData.time)) {
                    throw new validation_error_1.ValidationError("O campo 'hora' deve ser um horário válido no formato HH:mm.");
                }
                const activity = this.activityRepository.create(Object.assign(Object.assign({}, activityData), { time: activityData.time }));
                if (activityData.speakerId) {
                    const speakers = yield this.speakerRepository.findByIds(activityData.speakerId);
                    activity.speaker = speakers;
                }
                if (activityData.idArea) {
                    const areasOfExpertise = yield data_source_1.AppDataSource.getRepository(areaOfExpertise_1.AreaOfExpertise).findByIds(activityData.idArea);
                    activity.areaOfExpertise = areasOfExpertise;
                }
                const savedActivity = yield this.activityRepository.save(activity);
                return {
                    idActivity: savedActivity.idActivity,
                    title: savedActivity.title,
                    description: savedActivity.description,
                    time: savedActivity.time,
                    date: savedActivity.date,
                    location: savedActivity.location,
                    speaker: (_b = (_a = savedActivity.speaker) === null || _a === void 0 ? void 0 : _a.map(speaker => ({
                        idSpeaker: speaker.idSpeaker,
                        name: speaker.name,
                        description: speaker.description || "Sem descrição",
                        role: speaker.role || "Sem função",
                        company: speaker.company || "Sem empresa",
                    }))) !== null && _b !== void 0 ? _b : [],
                    areaOfExpertise: (_d = (_c = savedActivity.areaOfExpertise) === null || _c === void 0 ? void 0 : _c.map(area => ({
                        idArea: area.idArea,
                        name: area.name,
                    }))) !== null && _d !== void 0 ? _d : [],
                    checkins: [],
                };
            }
            catch (error) {
                if (error instanceof validation_error_1.ValidationError) {
                    throw error;
                }
                else if (error.name === "QueryFailedError") {
                    throw new data_base_error_1.DatabaseError("Falha ao criar a Atividade no banco de dados!");
                }
                else {
                    throw new TypeError("Falha inesperada ao criar a atividade!");
                }
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.activityRepository.delete(id);
                if (result.affected === 0) {
                    throw new not_found_error_1.NotFoundError("Atividade não encontrada ou já excluída.");
                }
            }
            catch (error) {
                if (error instanceof not_found_error_1.NotFoundError) {
                    throw error;
                }
                else if (error.name === "QueryFailedError") {
                    throw new data_base_error_1.DatabaseError("Falha ao deletar a Atividade no banco de dados!");
                }
                else {
                    throw new TypeError("Falha inesperada ao deletar a atividade!");
                }
            }
        });
    }
}
exports.default = new ActivityRepository();
