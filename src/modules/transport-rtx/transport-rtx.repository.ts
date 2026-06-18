import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TransportRtx } from "./entities/transport-rtx.entity";
import { TransportRtxDto, UpdateTransportRtxDto } from "./dto/transport-rtx.dto";

@Injectable()
export class TransportRtxRepository {
    constructor(
        @InjectRepository(TransportRtx)
        private readonly repo: Repository<TransportRtx>,
    ) {}

    findAll(): Promise<TransportRtx[]> { return this.repo.find({ relations: { uf: true }, order: { uf: { uf: "ASC" } } }); }
    findById(id: number): Promise<TransportRtx | null> { return this.repo.findOne({ where: { id }, relations: { uf: true } }); }
    findByUfId(ufId: number): Promise<TransportRtx | null> { return this.repo.findOne({ where: { ufId } }); }

    create(data: TransportRtxDto): Promise<TransportRtx> {
        return this.repo.save(this.repo.create(data));
    }

    async update(id: number, data: UpdateTransportRtxDto): Promise<TransportRtx> {
        const entity = await this.repo.findOneOrFail({ where: { id } });
        Object.assign(entity, data);
        return this.repo.save(entity);
    }

    async updateByUfId(ufId: number, data: UpdateTransportRtxDto): Promise<TransportRtx> {
        const entity = await this.repo.findOneOrFail({ where: { ufId } });
        Object.assign(entity, data);
        return this.repo.save(entity);
    }

    async softDelete(id: number): Promise<void> { await this.repo.softDelete(id); }
}
