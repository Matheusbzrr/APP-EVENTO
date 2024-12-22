"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatError = void 0;
class FormatError extends Error {
    constructor(message) {
        super(message);
        this.name = "FormatError";
    }
}
exports.FormatError = FormatError;
