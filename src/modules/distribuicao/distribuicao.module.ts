import { Module } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { DistribuicaoController } from "./distribuicao.controller";
import { DistribuicaoService } from "./distribuicao.service";
import { TransportRtxModule } from "../transport-rtx/transport-rtx.module";
import { TransportTrsModule } from "../transport-trs/transport-trs.module";
import { UfModule } from "../uf/uf.module";

@Module({
    imports: [TransportRtxModule, TransportTrsModule, UfModule],
    controllers: [DistribuicaoController],
    providers: [DistribuicaoService, Reflector],
})
export class DistribuicaoModule {}
