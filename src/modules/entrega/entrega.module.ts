import { Module } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { EntregaController } from "./entrega.controller";
import { EntregaService } from "./entrega.service";
import { TransportRtxModule } from "../transport-rtx/transport-rtx.module";
import { TransportTrsModule } from "../transport-trs/transport-trs.module";
import { GeneralQuotaModule } from "../general-quota/general-quota.module";
import { DeliveredRtxTrsModule } from "../delivered-rtx-trs/delivered-rtx-trs.module";
import { DeliveredGeneralQuotaModule } from "../delivered-general-quota/delivered-general-quota.module";
import { UfModule } from "../uf/uf.module";

@Module({
    imports: [
        TransportRtxModule,
        TransportTrsModule,
        GeneralQuotaModule,
        DeliveredRtxTrsModule,
        DeliveredGeneralQuotaModule,
        UfModule,
    ],
    controllers: [EntregaController],
    providers: [EntregaService, Reflector],
})
export class EntregaModule {}
