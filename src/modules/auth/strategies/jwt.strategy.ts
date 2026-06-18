import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRole } from "../entities/user.entity";

interface JwtPayload {
    sub: number;
    email: string;
    role: UserRole;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET ?? "default_secret",
        });
    }

    validate(payload: JwtPayload) {
        if (!payload?.sub || !payload?.email) {
            throw new UnauthorizedException("Token inválido");
        }
        return { id: payload.sub, email: payload.email, role: payload.role };
    }
}
