import { Injectable, NotFoundException } from "@nestjs/common";
import { GeneralQuotaRepository } from "./general-quota.repository";
import { GeneralQuotaDto, UpdateGeneralQuotaDto } from "./dto/general-quota.dto";

@Injectable()
export class GeneralQuotaService {
    constructor(private readonly repo: GeneralQuotaRepository) {}

    findAll() { return this.repo.findAll(); }

    async findById(id: number) {
        const item = await this.repo.findById(id);
        if (!item) throw new NotFoundException(`GeneralQuota ${id} não encontrado`);
        return item;
    }

    create(data: GeneralQuotaDto) { return this.repo.create(data); }

    async update(id: number, data: UpdateGeneralQuotaDto) {
        await this.findById(id);
        return this.repo.update(id, data);
    }

    updateByUfId(ufId: number, data: UpdateGeneralQuotaDto) {
        return this.repo.updateByUfId(ufId, data);
    }

    async remove(id: number) {
        await this.findById(id);
        await this.repo.softDelete(id);
        return { message: "Registro removido com sucesso" };
    }
}
