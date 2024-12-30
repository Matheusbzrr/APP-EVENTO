export class InvalidInputException extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = "InvalidInputException";
        this.statusCode = 400; 
        Object.setPrototypeOf(this, InvalidInputException.prototype);
    }
}