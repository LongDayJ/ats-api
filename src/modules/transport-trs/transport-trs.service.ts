import { Injectable, NotFoundException } from "@nestjs/common";
import { TransportTrsRepository } from "./transport-trs.repository";
import { TransportTrsDto, UpdateTransportTrsDto } from "./dto/transport-trs.dto";

@Injectable()
export class TransportTrsService {
    constructor(private readonly repo: TransportTrsRepository) {}

    findAll() { return this.repo.findAll(); }

    async findById(id: number) {
        const item = await this.repo.findById(id);
        if (!item) throw new NotFoundException(`TransportTrs ${id} não encontrado`);
        return item;
    }

    create(data: TransportTrsDto) { return this.repo.create(data); }

    async update(id: number, data: UpdateTransportTrsDto) {
        await this.findById(id);
        return this.repo.update(id, data);
    }

    updateByUfId(ufId: number, data: UpdateTransportTrsDto) {
        return this.repo.updateByUfId(ufId, data);
    }

    async remove(id: number) {
        await this.findById(id);
        await this.repo.softDelete(id);
        return { message: "Registro removido com sucesso" };
    }
}
