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
const post_service_1 = __importDefault(require("../../domain/services/post.service"));
const not_found_error_1 = require("../../domain/exceptions/not-found-error");
const data_base_error_1 = require("../../domain/exceptions/data-base-error");
const validation_error_1 = require("../../domain/exceptions/validation-error");
class PostController {
    getAllPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield post_service_1.default.getAllPosts();
                res.status(200).json(posts);
            }
            catch (err) {
                console.error("Erro ao buscar posts:", err);
                if (err instanceof data_base_error_1.DatabaseError) {
                    res.status(503).send({ message: err.message });
                }
                else {
                    res.status(500).send({ message: "Erro inesperado ao buscar posts." });
                }
            }
        });
    }
    getPostsByParticipantEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.query;
                if (!email || typeof email !== "string") {
                    res.status(400).send({ message: "E-mail inválido ou não fornecido." });
                    return;
                }
                const posts = yield post_service_1.default.getPostsByParticipantEmail(email);
                res.status(200).json(posts);
            }
            catch (err) {
                console.error("Erro ao buscar posts por e-mail:", err);
                if (err instanceof not_found_error_1.NotFoundError) {
                    res.status(404).send({ message: err.message });
                }
                else if (err instanceof data_base_error_1.DatabaseError) {
                    res.status(503).send({ message: err.message });
                }
                else {
                    res.status(500).send({ message: "Erro inesperado ao buscar posts." });
                }
            }
        });
    }
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postData = req.body;
                const post = yield post_service_1.default.createPost(postData);
                res.status(201).json(post);
            }
            catch (err) {
                console.error("Erro ao criar post:", err);
                if (err instanceof validation_error_1.ValidationError) {
                    res.status(400).send({ message: err.message });
                }
                else if (err instanceof data_base_error_1.DatabaseError) {
                    res.status(503).send({ message: err.message });
                }
                else {
                    res.status(500).send({ message: "Erro inesperado ao criar post." });
                }
            }
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield post_service_1.default.deletePost(Number(id));
                res.status(204).send();
            }
            catch (err) {
                console.error("Erro ao excluir post:", err);
                if (err instanceof not_found_error_1.NotFoundError) {
                    res.status(404).send({ message: err.message });
                }
                else if (err instanceof data_base_error_1.DatabaseError) {
                    res.status(503).send({ message: err.message });
                }
                else {
                    res.status(500).send({ message: "Erro inesperado ao excluir post." });
                }
            }
        });
    }
}
exports.default = new PostController();
