import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reflector } from "@nestjs/core";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { RolesGuard } from "./guards/roles.guard";
import { Users } from "./entities/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Users]),
        PassportModule,
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET ?? "default_secret",
                signOptions: { expiresIn: (process.env.JWT_EXPIRES_IN ?? "30m") as any },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository, JwtStrategy, RolesGuard, Reflector],
    exports: [JwtModule, PassportModule, RolesGuard, Reflector],
})
export class AuthModule {}
