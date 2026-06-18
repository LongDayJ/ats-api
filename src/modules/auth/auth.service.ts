import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { AuthRepository } from "./auth.repository";
import { InvalidCredentialsException } from "./exceptions/invalid.exception";
import { UserAlreadyExistsException } from "./exceptions/userAlready.exception";
import * as payload from "./type/payload";

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService,
    ) {}

    async login(data: payload.login) {
        const user = await this.authRepository.findByEmail(data.login);

        if (!user) throw new InvalidCredentialsException();

        const passwordMatch = await bcrypt.compare(data.password, user.password);
        if (!passwordMatch) throw new InvalidCredentialsException();

        const token = this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role,
        });

        return {
            access_token: token,
            user: {
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                role: user.role,
            },
        };
    }

    async createUser(data: payload.createUser) {
        const existing = await this.authRepository.findByEmail(data.email);
        if (existing) throw new UserAlreadyExistsException();

        const hashedPassword = await bcrypt.hash(
            data.password,
            Number(process.env.HASH_AMOUNT) || 12,
        );

        await this.authRepository.create({
            name: data.name,
            surname: data.surname,
            email: data.email,
            password: hashedPassword,
            role: data.role,
        });

        return { message: "Usuário cadastrado com sucesso" };
    }
}
