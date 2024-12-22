"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateEmailError = void 0;
class DuplicateEmailError extends Error {
    constructor(email) {
        super(`O e-mail ${email} já está em uso por outro participante.`);
        this.name = "DuplicateEmailError";
    }
}
exports.DuplicateEmailError = DuplicateEmailError;
