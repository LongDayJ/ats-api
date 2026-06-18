import { Injectable, NotFoundException } from "@nestjs/common";
import { UfRepository } from "./uf.repository";
import { UpdateUfDto } from "./dto/uf.dto";

@Injectable()
export class UfService {
    constructor(private readonly repo: UfRepository) {}

    findAll() { return this.repo.findAll(); }

    async findById(id: number) {
        const item = await this.repo.findById(id);
        if (!item) throw new NotFoundException(`UF ${id} não encontrada`);
        return item;
    }

    async update(id: number, data: UpdateUfDto) {
        await this.findById(id);
        return this.repo.update(id, data);
    }
}
