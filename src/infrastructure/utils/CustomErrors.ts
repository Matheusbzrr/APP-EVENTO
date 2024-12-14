export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}

export class DatabaseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DatabaseError";
    }
}

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }
}

export class PermissionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PermissionError";
    }
}

export class RelationshipError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "RelationshipError";
    }
}

export class RecordNotFoundError extends Error {
    constructor(entity: string, identifier: string) {
        super(`${entity} com identificador ${identifier} não foi encontrado.`);
        this.name = "RecordNotFoundError";
    }
}

export class DuplicateEmailError extends Error {
    constructor(email: string) {
        super(`O e-mail ${email} já está em uso por outro participante.`);
        this.name = "DuplicateEmailError";
    }
}


export class ConflictError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ConflictError";
    }
}

export class AuthenticationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AuthenticationError";
    }
}

export class AuthorizationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AuthorizationError";
    }
}

export class IOError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "IOError";
    }
}

export class LimitExceededError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "LimitExceededError";
    }
}

export class TimeoutError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "TimeoutError";
    }
}

export class DependencyError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DependencyError";
    }
}

export class FormatError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "FormatError";
    }
}

