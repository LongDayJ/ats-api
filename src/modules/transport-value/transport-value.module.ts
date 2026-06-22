import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransportValue } from "./entities/transport-value.entity";
import { TransportValueService } from "./transport-value.service";
import { TransportValueController } from "./transport-value.controller";

@Module({
    imports: [TypeOrmModule.forFeature([TransportValue])],
    providers: [TransportValueService],
    controllers: [TransportValueController],
    exports: [TypeOrmModule],
})
export class TransportValueModule {}
