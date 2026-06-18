import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reflector } from "@nestjs/core";
import { GeneralQuota } from "./entities/general-quota.entity";
import { GeneralQuotaController } from "./general-quota.controller";
import { GeneralQuotaService } from "./general-quota.service";
import { GeneralQuotaRepository } from "./general-quota.repository";

@Module({
    imports: [TypeOrmModule.forFeature([GeneralQuota])],
    controllers: [GeneralQuotaController],
    providers: [GeneralQuotaService, GeneralQuotaRepository, Reflector],
    exports: [GeneralQuotaService, GeneralQuotaRepository],
})
export class GeneralQuotaModule {}
