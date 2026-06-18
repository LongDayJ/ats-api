import { Module } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ConsolidadoController } from "./consolidado.controller";
import { ConsolidadoService } from "./consolidado.service";
import { TransportRtxModule } from "../transport-rtx/transport-rtx.module";
import { TransportTrsModule } from "../transport-trs/transport-trs.module";
import { GeneralQuotaModule } from "../general-quota/general-quota.module";
import { UfModule } from "../uf/uf.module";

@Module({
    imports: [TransportRtxModule, TransportTrsModule, GeneralQuotaModule, UfModule],
    controllers: [ConsolidadoController],
    providers: [ConsolidadoService, Reflector],
})
export class ConsolidadoModule {}
