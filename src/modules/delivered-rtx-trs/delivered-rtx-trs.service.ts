import { Injectable } from "@nestjs/common";
import { DeliveredRtxTrsRepository } from "./delivered-rtx-trs.repository";
import { UpdateDeliveredRtxTrsDto } from "./dto/delivered-rtx-trs.dto";

@Injectable()
export class DeliveredRtxTrsService {
    constructor(private readonly repo: DeliveredRtxTrsRepository) {}
    findAll() { return this.repo.findAll(); }
    updateByUfId(ufId: number, data: UpdateDeliveredRtxTrsDto) { return this.repo.updateByUfId(ufId, data); }
}
