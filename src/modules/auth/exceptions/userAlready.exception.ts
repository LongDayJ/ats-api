import { ConflictException } from "@nestjs/common";

export class UserAlreadyExistsException extends ConflictException {
    constructor() {
        super("Ja existe um usuario cadastrado com este e-mail");
    }
}
