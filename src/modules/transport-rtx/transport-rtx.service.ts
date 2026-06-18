import { Injectable, NotFoundException } from "@nestjs/common";
import { TransportRtxRepository } from "./transport-rtx.repository";
import { TransportRtxDto, UpdateTransportRtxDto } from "./dto/transport-rtx.dto";

@Injectable()
export class TransportRtxService {
    constructor(private readonly repo: TransportRtxRepository) {}

    findAll() { return this.repo.findAll(); }

    async findById(id: number) {
        const item = await this.repo.findById(id);
        if (!item) throw new NotFoundException(`TransportRtx ${id} não encontrado`);
        return item;
    }

    create(data: TransportRtxDto) { return this.repo.create(data); }

    async update(id: number, data: UpdateTransportRtxDto) {
        await this.findById(id);
        return this.repo.update(id, data);
    }

    updateByUfId(ufId: number, data: UpdateTransportRtxDto) {
        return this.repo.updateByUfId(ufId, data);
    }

    async remove(id: number) {
        await this.findById(id);
        await this.repo.softDelete(id);
        return { message: "Registro removido com sucesso" };
    }
}
