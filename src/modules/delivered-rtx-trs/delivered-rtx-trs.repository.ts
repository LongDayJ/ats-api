import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeliveredRtxTrs } from "./entities/delivered-rtx-trs.entity";
import { UpdateDeliveredRtxTrsDto } from "./dto/delivered-rtx-trs.dto";

@Injectable()
export class DeliveredRtxTrsRepository {
    constructor(
        @InjectRepository(DeliveredRtxTrs)
        private readonly repo: Repository<DeliveredRtxTrs>,
    ) {}

    findAll(): Promise<DeliveredRtxTrs[]> {
        return this.repo.find({ relations: { uf: true }, order: { uf: { uf: "ASC" } } });
    }

    findByUfId(ufId: number): Promise<DeliveredRtxTrs | null> {
        return this.repo.findOne({ where: { ufId } });
    }

    async updateByUfId(ufId: number, data: UpdateDeliveredRtxTrsDto): Promise<DeliveredRtxTrs> {
        const entity = await this.repo.findOneOrFail({ where: { ufId } });
        Object.assign(entity, data);
        return this.repo.save(entity);
    }
}
