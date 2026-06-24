import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CibDocument } from "./entities/cib-document.entity";
import { CibService } from "./cib.service";
import { CibController } from "./cib.controller";

@Module({
    imports: [TypeOrmModule.forFeature([CibDocument])],
    providers: [CibService],
    controllers: [CibController],
})
export class CibModule {}
