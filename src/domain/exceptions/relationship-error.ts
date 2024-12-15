export class RelationshipError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "RelationshipError";
    }
}
