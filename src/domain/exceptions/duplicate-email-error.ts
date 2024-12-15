export class DuplicateEmailError extends Error {
    constructor(email: string) {
        super(`O e-mail ${email} já está em uso por outro participante.`);
        this.name = "DuplicateEmailError";
    }
}