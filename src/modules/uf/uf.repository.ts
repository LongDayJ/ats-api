import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Uf } from "./entities/uf.entity";
import { UpdateUfDto } from "./dto/uf.dto";

@Injectable()
export class UfRepository {
    constructor(
        @InjectRepository(Uf)
        private readonly repo: Repository<Uf>,
    ) {}

    findAll(): Promise<Uf[]> {
        return this.repo.find({ order: { uf: "ASC" } });
    }

    findById(id: number): Promise<Uf | null> {
        return this.repo.findOne({ where: { id } });
    }

    findByUf(uf: string): Promise<Uf | null> {
        return this.repo.findOne({ where: { uf: uf.toUpperCase() } });
    }

    async update(id: number, data: UpdateUfDto): Promise<Uf> {
        const entity = await this.repo.findOneOrFail({ where: { id } });
        Object.assign(entity, data);
        return this.repo.save(entity);
    }
}
