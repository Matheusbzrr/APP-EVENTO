"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionError = void 0;
class PermissionError extends Error {
    constructor(message) {
        super(message);
        this.name = "PermissionError";
    }
}
exports.PermissionError = PermissionError;
