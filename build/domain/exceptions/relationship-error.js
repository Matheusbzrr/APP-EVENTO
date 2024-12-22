"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipError = void 0;
class RelationshipError extends Error {
    constructor(message) {
        super(message);
        this.name = "RelationshipError";
    }
}
exports.RelationshipError = RelationshipError;
