import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TransportTrs } from "./entities/transport-trs.entity";
import { TransportTrsDto, UpdateTransportTrsDto } from "./dto/transport-trs.dto";

@Injectable()
export class TransportTrsRepository {
    constructor(
        @InjectRepository(TransportTrs)
        private readonly repo: Repository<TransportTrs>,
    ) {}

    findAll(): Promise<TransportTrs[]> { return this.repo.find({ relations: { uf: true }, order: { uf: { uf: "ASC" } } }); }
    findById(id: number): Promise<TransportTrs | null> { return this.repo.findOne({ where: { id }, relations: { uf: true } }); }
    findByUfId(ufId: number): Promise<TransportTrs | null> { return this.repo.findOne({ where: { ufId } }); }

    create(data: TransportTrsDto): Promise<TransportTrs> { return this.repo.save(this.repo.create(data)); }

    async update(id: number, data: UpdateTransportTrsDto): Promise<TransportTrs> {
        const entity = await this.repo.findOneOrFail({ where: { id } });
        Object.assign(entity, data);
        return this.repo.save(entity);
    }

    async updateByUfId(ufId: number, data: UpdateTransportTrsDto): Promise<TransportTrs> {
        const entity = await this.repo.findOneOrFail({ where: { ufId } });
        Object.assign(entity, data);
        return this.repo.save(entity);
    }

    async softDelete(id: number): Promise<void> { await this.repo.softDelete(id); }
}
