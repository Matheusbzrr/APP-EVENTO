export class RecordNotFoundError extends Error {
    constructor(entity: string, identifier: string) {
        super(`${entity} com identificador ${identifier} não foi encontrado.`);
        this.name = "RecordNotFoundError";
    }
}