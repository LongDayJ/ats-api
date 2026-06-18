import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransportValue } from "./entities/transport-value.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TransportValue])],
    exports: [TypeOrmModule],
})
export class TransportValueModule {}
