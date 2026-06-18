import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users, UserRole } from "./entities/user.entity";

interface CreateUserData {
    name: string;
    surname: string;
    email: string;
    password: string;
    role: UserRole;
}

@Injectable()
export class AuthRepository {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
    ) {}

    async findByEmail(email: string): Promise<Users | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async create(data: CreateUserData): Promise<Users> {
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }
}
