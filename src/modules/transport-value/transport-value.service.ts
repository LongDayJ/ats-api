import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TransportValue } from "./entities/transport-value.entity";

@Injectable()
export class TransportValueService {
    constructor(
        @InjectRepository(TransportValue)
        private readonly repo: Repository<TransportValue>,
    ) {}

    findAll(): Promise<TransportValue[]> {
        return this.repo.find({ order: { id: "ASC" } });
    }
}
