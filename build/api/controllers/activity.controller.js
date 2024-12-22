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
const activity_service_1 = __importDefault(require("../../domain/services/activity.service"));
const data_base_error_1 = require("../../domain/exceptions/data-base-error");
const not_found_error_1 = require("../../domain/exceptions/not-found-error");
const validation_error_1 = require("../../domain/exceptions/validation-error");
class ActivityController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activities = yield activity_service_1.default.getAllActivities();
                res.json(activities);
            }
            catch (err) {
                console.error("Erro ao listar atividades:", err);
                if (err instanceof TypeError) {
                    res.status(503).send({ message: err.message });
                }
                else if (err instanceof data_base_error_1.DatabaseError) {
                    res.status(503).send({ message: err.message });
                }
                else if (err instanceof not_found_error_1.NotFoundError) {
                    res.status(404).send({ message: err.message });
                }
                else {
                    res.status(500).send({ message: "Ocorreu um erro inesperado." });
                }
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activityData = req.body;
                console.log("Dados recebidos para criação:", activityData);
                const activity = yield activity_service_1.default.createActivity(activityData);
                res.status(201).json(activity);
            }
            catch (err) {
                console.error("Erro ao criar atividade:", err);
                if (err instanceof validation_error_1.ValidationError) {
                    res.status(400).send({ message: err.message });
                }
                else if (err instanceof TypeError) {
                    res.status(500).send({ message: err.message });
                }
                else if (err instanceof data_base_error_1.DatabaseError) {
                    res.status(503).send({ message: err.message });
                }
                else {
                    res.status(500).json({
                        message: "Erro ao criar atividade.",
                        error: err.message || "Erro desconhecido.",
                    });
                }
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield activity_service_1.default.deleteActivity(Number(id));
                res.status(204).send(); // No content response
            }
            catch (err) {
                console.error("Erro ao excluir atividade:", err.message || err);
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
                    res.status(500).json({
                        message: "Erro ao excluir atividade.",
                        error: err.message || "Erro desconhecido.",
                    });
                }
            }
        });
    }
}
exports.default = new ActivityController();
