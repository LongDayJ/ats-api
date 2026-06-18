import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reflector } from "@nestjs/core";
import { TransportRtx } from "./entities/transport-rtx.entity";
import { TransportRtxController } from "./transport-rtx.controller";
import { TransportRtxService } from "./transport-rtx.service";
import { TransportRtxRepository } from "./transport-rtx.repository";

@Module({
    imports: [TypeOrmModule.forFeature([TransportRtx])],
    controllers: [TransportRtxController],
    providers: [TransportRtxService, TransportRtxRepository, Reflector],
    exports: [TransportRtxService, TransportRtxRepository],
})
export class TransportRtxModule {}
