"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordNotFoundError = void 0;
class RecordNotFoundError extends Error {
    constructor(entity, identifier) {
        super(`${entity} com identificador ${identifier} não foi encontrado.`);
        this.name = "RecordNotFoundError";
    }
}
exports.RecordNotFoundError = RecordNotFoundError;
