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
const checkin_service_1 = __importDefault(require("../../domain/services/checkin.service"));
const data_base_error_1 = require("../../domain/exceptions/data-base-error");
const not_found_error_1 = require("../../domain/exceptions/not-found-error");
const record_not_found_1 = require("../../domain/exceptions/record-not-found");
class CheckinController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const checkins = yield checkin_service_1.default.getAllCheckins();
                res.json(checkins);
            }
            catch (err) {
                console.error("Erro ao listar checkins:", err);
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
                const checkinData = req.body;
                const checkin = yield checkin_service_1.default.createCheckin(checkinData);
                res.status(201).json(checkin);
            }
            catch (err) {
                console.error("Erro ao criar checkin:", err);
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
                    res.status(500).send({
                        message: "Erro interno ao criar checkin.",
                        error: err.message || "Erro desconhecido",
                    });
                }
            }
        });
    }
}
exports.default = new CheckinController();
