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
const auth_service_1 = __importDefault(require("../../domain/services/auth.service"));
const authentiction_error_1 = require("../../domain/exceptions/authentiction-error");
const data_base_error_1 = require("../../domain/exceptions/data-base-error");
class AuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            if (!email) {
                res.status(400).json({ error: "E-mail é obrigatório" });
                return;
            }
            try {
                const token = yield auth_service_1.default.login(email);
                if (!token) {
                    throw new authentiction_error_1.AuthenticationError("E-mail não encontrado");
                }
                res.json({ token, email });
            }
            catch (error) {
                console.error("Erro ao realizar login:", error);
                if (error instanceof authentiction_error_1.AuthenticationError) {
                    res.status(400).json({ error: error.message });
                }
                else if (error instanceof data_base_error_1.DatabaseError) {
                    res.status(503).json({ error: "Erro nos dados" });
                }
                else {
                    res.status(500).json({ error: "Erro no servidor" });
                }
            }
        });
    }
}
exports.default = AuthController;
