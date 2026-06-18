import { Injectable, NotFoundException } from "@nestjs/common";
import { DeliveredGeneralQuotaRepository } from "./delivered-general-quota.repository";
import { DeliveredGeneralQuotaDto, UpdateDeliveredGeneralQuotaDto } from "./dto/delivered-general-quota.dto";

@Injectable()
export class DeliveredGeneralQuotaService {
    constructor(private readonly repo: DeliveredGeneralQuotaRepository) {}

    findAll() { return this.repo.findAll(); }

    async findById(id: number) {
        const item = await this.repo.findById(id);
        if (!item) throw new NotFoundException(`DeliveredGeneralQuota ${id} não encontrado`);
        return item;
    }

    create(data: DeliveredGeneralQuotaDto) { return this.repo.create(data); }

    async update(id: number, data: UpdateDeliveredGeneralQuotaDto) {
        await this.findById(id);
        return this.repo.update(id, data);
    }

    updateByUfId(ufId: number, data: UpdateDeliveredGeneralQuotaDto) {
        return this.repo.updateByUfId(ufId, data);
    }

    async remove(id: number) {
        await this.findById(id);
        await this.repo.softDelete(id);
        return { message: "Registro removido com sucesso" };
    }
}
