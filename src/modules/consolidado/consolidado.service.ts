import { Injectable, NotFoundException } from "@nestjs/common";
import { TransportRtxRepository } from "../transport-rtx/transport-rtx.repository";
import { TransportTrsRepository } from "../transport-trs/transport-trs.repository";
import { GeneralQuotaRepository } from "../general-quota/general-quota.repository";
import { UfRepository } from "../uf/uf.repository";

@Injectable()
export class ConsolidadoService {
    constructor(
        private readonly transportRtxRepo: TransportRtxRepository,
        private readonly transportTrsRepo: TransportTrsRepository,
        private readonly generalQuotaRepo: GeneralQuotaRepository,
        private readonly ufRepo: UfRepository,
    ) {}

    async findAll() {
        const ufs = await this.ufRepo.findAll();
        const [rtxList, trsList, gqList] = await Promise.all([
            this.transportRtxRepo.findAll(),
            this.transportTrsRepo.findAll(),
            this.generalQuotaRepo.findAll(),
        ]);

        return ufs.map((uf) => ({
            uf,
            rtx: rtxList.find((r) => r.ufId === uf.id) ?? null,
            trs: trsList.find((t) => t.ufId === uf.id) ?? null,
            generalQuota: gqList.find((g) => g.ufId === uf.id) ?? null,
        }));
    }

    async findByUfId(ufId: number) {
        const uf = await this.ufRepo.findById(ufId);
        if (!uf) throw new NotFoundException(`UF ${ufId} não encontrada`);

        const [rtx, trs, generalQuota] = await Promise.all([
            this.transportRtxRepo.findByUfId(ufId),
            this.transportTrsRepo.findByUfId(ufId),
            this.generalQuotaRepo.findByUfId(ufId),
        ]);

        return { uf, rtx, trs, generalQuota };
    }
}
