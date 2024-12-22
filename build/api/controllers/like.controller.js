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
const like_service_1 = __importDefault(require("../../domain/services/like.service"));
const data_base_error_1 = require("../../domain/exceptions/data-base-error");
const not_found_error_1 = require("../../domain/exceptions/not-found-error");
const record_not_found_1 = require("../../domain/exceptions/record-not-found");
class LikeController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const likes = yield like_service_1.default.getAllLikes();
                res.json(likes);
            }
            catch (err) {
                console.error("Erro ao listar likes:", err.message || err);
                if (err instanceof not_found_error_1.NotFoundError) {
                    res.status(404).send({ message: err.message });
                }
                else if (err instanceof data_base_error_1.DatabaseError) {
                    res.status(503).send({ message: err.message });
                }
                else if (err instanceof TypeError) {
                    res.status(500).send({ message: err.message });
                }
                else {
                    res.status(500).send({ message: "Erro desconhecido" });
                }
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const likeData = req.body;
                const like = yield like_service_1.default.createLike(likeData);
                res.status(201).json(like);
            }
            catch (err) {
                console.error("Erro ao dar like:", err.message || err);
                if (err instanceof record_not_found_1.RecordNotFoundError) {
                    res.status(404).send({ message: err.message });
                }
                else if (err instanceof data_base_error_1.DatabaseError) {
                    res.status(503).send({ message: err.message });
                }
                else if (err instanceof TypeError) {
                    res.status(500).send({ message: err.message });
                }
                else {
                    res.status(500).send({ message: "Erro inesperado ao dar o like." });
                }
            }
        });
    }
    countLikesPerPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idPost = Number(req.params.idPost);
                if (isNaN(idPost)) {
                    res.status(400).send({ message: "O ID da postagem deve ser um número válido." });
                    return;
                }
                const result = yield like_service_1.default.findPostWithLikes(idPost);
                res.status(200).json(result);
            }
            catch (err) {
                console.error("Erro ao contar likes por postagem:");
                if (err instanceof not_found_error_1.NotFoundError) {
                    res.status(404).send({ message: err.message });
                }
                else if (err instanceof data_base_error_1.DatabaseError) {
                    res.status(503).send({ message: err.message });
                }
                else if (err instanceof TypeError) {
                    res.status(500).send({ message: err.message });
                }
                else {
                    res.status(500).send({ message: "Erro desconhecido." });
                }
            }
        });
    }
}
exports.default = new LikeController();
