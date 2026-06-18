import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource } from "typeorm";
import { GeneralQuotaRepository } from "../general-quota/general-quota.repository";
import { DeliveredGeneralQuotaRepository } from "../delivered-general-quota/delivered-general-quota.repository";
import { UfRepository } from "../uf/uf.repository";
import { UpdateCotaGeralDto } from "./dto/cota-geral.dto";

@Injectable()
export class CotaGeralService {
    constructor(
        private readonly dataSource: DataSource,
        private readonly generalQuotaRepo: GeneralQuotaRepository,
        private readonly deliveredGeneralQuotaRepo: DeliveredGeneralQuotaRepository,
        private readonly ufRepo: UfRepository,
    ) {}

    async findAll() {
        const ufs = await this.ufRepo.findAll();
        const [gqList, dgqList] = await Promise.all([
            this.generalQuotaRepo.findAll(),
            this.deliveredGeneralQuotaRepo.findAll(),
        ]);

        return ufs.map((uf) => ({
            uf,
            generalQuota: gqList.find((g) => g.ufId === uf.id) ?? null,
            deliveredGeneralQuota: dgqList.find((d) => d.ufId === uf.id) ?? null,
        }));
    }

    async findByUfId(ufId: number) {
        const uf = await this.ufRepo.findById(ufId);
        if (!uf) throw new NotFoundException(`UF ${ufId} não encontrada`);

        const [generalQuota, deliveredGeneralQuota] = await Promise.all([
            this.generalQuotaRepo.findByUfId(ufId),
            this.deliveredGeneralQuotaRepo.findByUfId(ufId),
        ]);

        return { uf, generalQuota, deliveredGeneralQuota };
    }

    async updateByUfId(ufId: number, data: UpdateCotaGeralDto) {
        const uf = await this.ufRepo.findById(ufId);
        if (!uf) throw new NotFoundException(`UF ${ufId} não encontrada`);

        await this.dataSource.transaction(async () => {
            if (data.generalQuota) await this.generalQuotaRepo.updateByUfId(ufId, data.generalQuota);
            if (data.deliveredGeneralQuota) await this.deliveredGeneralQuotaRepo.updateByUfId(ufId, data.deliveredGeneralQuota);
        });

        return this.findByUfId(ufId);
    }
}
