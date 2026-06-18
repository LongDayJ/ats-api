import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GeneralQuota } from "./entities/general-quota.entity";
import { GeneralQuotaDto, UpdateGeneralQuotaDto } from "./dto/general-quota.dto";

@Injectable()
export class GeneralQuotaRepository {
    constructor(
        @InjectRepository(GeneralQuota)
        private readonly repo: Repository<GeneralQuota>,
    ) {}

    findAll(): Promise<GeneralQuota[]> { return this.repo.find({ relations: { uf: true }, order: { uf: { uf: "ASC" } } }); }
    findById(id: number): Promise<GeneralQuota | null> { return this.repo.findOne({ where: { id }, relations: { uf: true } }); }
    findByUfId(ufId: number): Promise<GeneralQuota | null> { return this.repo.findOne({ where: { ufId } }); }

    create(data: GeneralQuotaDto): Promise<GeneralQuota> { return this.repo.save(this.repo.create(data)); }

    async update(id: number, data: UpdateGeneralQuotaDto): Promise<GeneralQuota> {
        const entity = await this.repo.findOneOrFail({ where: { id } });
        Object.assign(entity, data);
        return this.repo.save(entity);
    }

    async updateByUfId(ufId: number, data: UpdateGeneralQuotaDto): Promise<GeneralQuota> {
        const entity = await this.repo.findOneOrFail({ where: { ufId } });
        Object.assign(entity, data);
        return this.repo.save(entity);
    }

    async softDelete(id: number): Promise<void> { await this.repo.softDelete(id); }
}
