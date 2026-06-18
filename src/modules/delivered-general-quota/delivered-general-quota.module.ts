import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reflector } from "@nestjs/core";
import { DeliveredGeneralQuota } from "./entities/delivered-general-quota.entity";
import { DeliveredGeneralQuotaController } from "./delivered-general-quota.controller";
import { DeliveredGeneralQuotaService } from "./delivered-general-quota.service";
import { DeliveredGeneralQuotaRepository } from "./delivered-general-quota.repository";

@Module({
    imports: [TypeOrmModule.forFeature([DeliveredGeneralQuota])],
    controllers: [DeliveredGeneralQuotaController],
    providers: [DeliveredGeneralQuotaService, DeliveredGeneralQuotaRepository, Reflector],
    exports: [DeliveredGeneralQuotaService, DeliveredGeneralQuotaRepository],
})
export class DeliveredGeneralQuotaModule {}
