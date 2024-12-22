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
const like_1 = require("../models/like");
const participant_1 = require("../models/participant");
const post_1 = require("../models/post");
class LikeRepository {
    constructor() {
        this.likeRepository = data_source_1.AppDataSource.getRepository(like_1.Like);
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const likes = yield this.likeRepository.find({
                    relations: [
                        "participant",
                        "participant.areaOfExpertise",
                        "post",
                    ],
                });
                if (!likes || likes.length === 0) {
                    throw new not_found_error_1.NotFoundError("Nenhum like encontrado.");
                }
                return likes.map(like => {
                    var _a, _b, _c, _d, _e, _f, _g, _h;
                    return ({
                        idLike: like.idLike,
                        participant: like.participant
                            ? {
                                idParticipant: like.participant.idParticipant,
                                name: (_a = like.participant.name) !== null && _a !== void 0 ? _a : "Sem nome",
                                email: (_b = like.participant.email) !== null && _b !== void 0 ? _b : "Sem e-mail",
                                companyName: (_c = like.participant.companyName) !== null && _c !== void 0 ? _c : "Sem empresa",
                                postPermission: (_d = like.participant.postPermission) !== null && _d !== void 0 ? _d : 0,
                                AreaOfExpertise: (_f = (_e = like.participant.areaOfExpertise) === null || _e === void 0 ? void 0 : _e.map((area) => ({
                                    idArea: area.idArea,
                                    name: area.name,
                                }))) !== null && _f !== void 0 ? _f : [],
                            }
                            : null,
                        idPost: (_h = (_g = like.post) === null || _g === void 0 ? void 0 : _g.idPost) !== null && _h !== void 0 ? _h : 0,
                    });
                });
            }
            catch (error) {
                console.error("Erro ao buscar todos os likes:", error);
                if (error instanceof not_found_error_1.NotFoundError) {
                    throw error;
                }
                else if (error.name === "QueryFailedError") {
                    throw new data_base_error_1.DatabaseError("Falha ao buscar os Likes no banco de dados!");
                }
                else {
                    throw new TypeError("Erro inesperado ao buscar todos os likes!");
                }
            }
        });
    }
    create(likeData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            try {
                const participant = yield data_source_1.AppDataSource.getRepository(participant_1.Participant).findOne({
                    where: { idParticipant: likeData.idParticipant },
                    relations: ["areaOfExpertise"],
                });
                if (!participant) {
                    throw new record_not_found_1.RecordNotFoundError("Erro ao tentar achar o participante de ID:", likeData.idParticipant.toString());
                }
                const post = yield data_source_1.AppDataSource.getRepository(post_1.Post).findOne({
                    where: { idPost: likeData.idPost },
                });
                if (!post) {
                    throw new record_not_found_1.RecordNotFoundError("Erro ao tentar achar o post de ID:", likeData.idPost.toString());
                }
                const like = this.likeRepository.create({
                    participant,
                    post,
                });
                const savedLike = yield this.likeRepository.save(like);
                return {
                    idLike: savedLike.idLike,
                    participant: {
                        idParticipant: participant.idParticipant,
                        name: (_a = participant.name) !== null && _a !== void 0 ? _a : "Sem nome",
                        email: (_b = participant.email) !== null && _b !== void 0 ? _b : "Sem e-mail",
                        companyName: (_c = participant.companyName) !== null && _c !== void 0 ? _c : "Sem empresa",
                        postPermission: (_d = participant.postPermission) !== null && _d !== void 0 ? _d : 0,
                        AreaOfExpertise: (_f = (_e = participant.areaOfExpertise) === null || _e === void 0 ? void 0 : _e.map(area => ({
                            idArea: area.idArea,
                            name: area.name,
                        }))) !== null && _f !== void 0 ? _f : [],
                    },
                    idPost: post.idPost,
                };
            }
            catch (error) {
                console.error("Erro ao criar like:", error);
                if (error instanceof record_not_found_1.RecordNotFoundError) {
                    throw error;
                }
                else if (error.name === "QueryFailedError") {
                    throw new data_base_error_1.DatabaseError("Erro ao guardar o Like no banco de dados.");
                }
                else {
                    throw new TypeError("Erro inesperado ao guardar o Like");
                }
            }
        });
    }
    CountLikesPerPost(idPost) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.likeRepository.query('CALL CountLikesPerPostFiltre(?)', [idPost]);
                return result[0];
            }
            catch (error) {
                console.error('Erro ao contar likes por post:', error);
                return {
                    idPost: idPost,
                    LikeCount: 0,
                };
            }
        });
    }
}
exports.default = new LikeRepository;
