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
const post_1 = require("../models/post");
const participant_1 = require("../models/participant");
class PostRepository {
    constructor() {
        this.postRepository = data_source_1.AppDataSource.getRepository(post_1.Post);
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.postRepository.find({
                    relations: [
                        "participant",
                        "participant.areaOfExpertise",
                        "likes",
                        "likes.participant",
                        "likes.participant.areaOfExpertise"
                    ],
                });
                console.log("Posts raw data:", posts); // Log dos dados crus do banco
                if (!posts || posts.length === 0) {
                    throw new not_found_error_1.NotFoundError("Nenhum post encontrado");
                }
                return posts.map(post => {
                    var _a, _b, _c, _d, _e, _f, _g, _h;
                    if (!post.participant || !post.participant.areaOfExpertise) {
                        console.error(`Participante ou áreas de expertise faltando no post:`, post);
                        throw new Error(`Participante ou áreas de expertise estão ausentes no post ID ${post.idPost}`);
                    }
                    return {
                        idPost: post.idPost,
                        imageUrl: (_a = post.imageUrl) !== null && _a !== void 0 ? _a : "",
                        description: (_b = post.description) !== null && _b !== void 0 ? _b : "",
                        participant: {
                            idParticipant: post.participant.idParticipant,
                            name: (_c = post.participant.name) !== null && _c !== void 0 ? _c : "Sem nome",
                            email: (_d = post.participant.email) !== null && _d !== void 0 ? _d : "Sem e-mail",
                            companyName: (_e = post.participant.companyName) !== null && _e !== void 0 ? _e : "Sem empresa",
                            postPermission: (_f = post.participant.postPermission) !== null && _f !== void 0 ? _f : 0,
                            AreaOfExpertise: post.participant.areaOfExpertise.map(area => ({
                                idArea: area.idArea,
                                name: area.name,
                            })),
                        },
                        likes: (_h = (_g = post.likes) === null || _g === void 0 ? void 0 : _g.map(like => {
                            var _a, _b, _c, _d, _e, _f, _g, _h;
                            return ({
                                idLike: like.idLike,
                                idPost: (_b = (_a = like.post) === null || _a === void 0 ? void 0 : _a.idPost) !== null && _b !== void 0 ? _b : 0,
                                participant: like.participant
                                    ? {
                                        idParticipant: like.participant.idParticipant,
                                        name: (_c = like.participant.name) !== null && _c !== void 0 ? _c : "Sem nome",
                                        email: (_d = like.participant.email) !== null && _d !== void 0 ? _d : "Sem e-mail",
                                        companyName: (_e = like.participant.companyName) !== null && _e !== void 0 ? _e : "Sem empresa",
                                        postPermission: (_f = like.participant.postPermission) !== null && _f !== void 0 ? _f : 0,
                                        AreaOfExpertise: (_h = (_g = like.participant.areaOfExpertise) === null || _g === void 0 ? void 0 : _g.map(area => ({
                                            idArea: area.idArea,
                                            name: area.name,
                                        }))) !== null && _h !== void 0 ? _h : [],
                                    }
                                    : null,
                            });
                        })) !== null && _h !== void 0 ? _h : [],
                    };
                });
            }
            catch (error) {
                console.error("Erro ao buscar posts:", error);
                if (error instanceof not_found_error_1.NotFoundError) {
                    throw error;
                }
                else if (error.name === "QueryFailedError") {
                    throw new data_base_error_1.DatabaseError("Falha ao buscar os posts no banco de dados!");
                }
                else {
                    throw new TypeError("Erro inesperado ao buscar os posts");
                }
            }
        });
    }
    findByParticipantEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.postRepository.find({
                    where: { participant: { email } },
                    relations: ["participant", "participant.areaOfExpertise"],
                });
                if (!posts || posts.length === 0) {
                    throw new not_found_error_1.NotFoundError(`Nenhum post encontrado para o e-mail ${email}`);
                }
                return posts.map(post => {
                    var _a, _b, _c, _d, _e, _f;
                    if (!post.participant.areaOfExpertise) {
                        throw new Error(`Participante com ID ${post.participant.idParticipant} não possui áreas de expertise.`);
                    }
                    return {
                        idPost: post.idPost,
                        imageUrl: (_a = post.imageUrl) !== null && _a !== void 0 ? _a : "",
                        description: (_b = post.description) !== null && _b !== void 0 ? _b : "",
                        participant: {
                            idParticipant: post.participant.idParticipant,
                            name: (_c = post.participant.name) !== null && _c !== void 0 ? _c : "Sem nome",
                            email: (_d = post.participant.email) !== null && _d !== void 0 ? _d : "Sem e-mail",
                            companyName: (_e = post.participant.companyName) !== null && _e !== void 0 ? _e : "Sem empresa",
                            postPermission: (_f = post.participant.postPermission) !== null && _f !== void 0 ? _f : 0,
                            AreaOfExpertise: post.participant.areaOfExpertise.map(area => ({
                                idArea: area.idArea,
                                name: area.name,
                            })),
                        },
                    };
                });
            }
            catch (error) {
                if (error instanceof not_found_error_1.NotFoundError) {
                    throw error;
                }
                else if (error.name === "QueryFailedError") {
                    throw new data_base_error_1.DatabaseError("Erro ao buscar posts pelo e-mail do participante.");
                }
                else {
                    throw new TypeError("Erro inesperado ao buscar os posts pelo e-mail");
                }
            }
        });
    }
    create(postData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            try {
                const participant = yield data_source_1.AppDataSource.getRepository(participant_1.Participant).findOne({
                    where: { idParticipant: postData.idParticipant },
                    relations: ["areaOfExpertise"],
                });
                if (!participant) {
                    throw new Error(`Participante com o ID ${postData.idParticipant} não foi encontrado.`);
                }
                if (!participant.areaOfExpertise) {
                    throw new Error(`Participante com o ID ${participant.idParticipant} não possui áreas de expertise.`);
                }
                const post = this.postRepository.create({
                    participant: participant,
                    imageUrl: (_a = postData.imageUrl) !== null && _a !== void 0 ? _a : "",
                    description: (_b = postData.description) !== null && _b !== void 0 ? _b : "",
                });
                const savedPost = yield this.postRepository.save(post);
                return {
                    idPost: savedPost.idPost,
                    imageUrl: (_c = savedPost.imageUrl) !== null && _c !== void 0 ? _c : "",
                    description: (_d = savedPost.description) !== null && _d !== void 0 ? _d : "",
                    participant: {
                        idParticipant: participant.idParticipant,
                        name: (_e = participant.name) !== null && _e !== void 0 ? _e : "Sem nome",
                        email: (_f = participant.email) !== null && _f !== void 0 ? _f : "Sem e-mail",
                        companyName: (_g = participant.companyName) !== null && _g !== void 0 ? _g : "Sem empresa",
                        postPermission: (_h = participant.postPermission) !== null && _h !== void 0 ? _h : 0,
                        AreaOfExpertise: participant.areaOfExpertise.map(area => ({
                            idArea: area.idArea,
                            name: area.name,
                        })),
                    },
                };
            }
            catch (error) {
                if (error.name === "QueryFailedError") {
                    throw new data_base_error_1.DatabaseError("Erro ao guardar o post no banco de dados.");
                }
                else {
                    throw new TypeError("Erro inesperado ao guardar o post");
                }
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.postRepository.delete(id);
                if (result.affected === 0) {
                    throw new not_found_error_1.NotFoundError(`Post com ID ${id} não encontrado para exclusão.`);
                }
            }
            catch (error) {
                throw new data_base_error_1.DatabaseError("Erro ao excluir o post no banco de dados.");
            }
        });
    }
}
exports.default = new PostRepository();
