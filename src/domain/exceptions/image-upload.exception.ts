export class ImageUploadException extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = "ImageUploadException";
        this.statusCode = 422; 
        Object.setPrototypeOf(this, ImageUploadException.prototype);
    }
}