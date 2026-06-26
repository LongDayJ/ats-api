import { Body, Controller, Get, Param, ParseIntPipe, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { DeliveredRtxTrsService } from "./delivered-rtx-trs.service";
import { UpdateDeliveredRtxTrsDto } from "./dto/delivered-rtx-trs.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";

@ApiTags("DeliveredRtxTrs")
@ApiBearerAuth("bearer")
@UseGuards(JwtAuthGuard)
@Controller("/delivered-rtx-trs")
export class DeliveredRtxTrsController {
    constructor(private readonly service: DeliveredRtxTrsService) {}

    @Get()
    findAll() { return this.service.findAll(); }

    @Put(":ufId")
    @UseGuards(RolesGuard)
    @Roles("admin", "gestor_transporte", "gestor_all")
    updateByUfId(@Param("ufId", ParseIntPipe) ufId: number, @Body() body: UpdateDeliveredRtxTrsDto) {
        return this.service.updateByUfId(ufId, body);
    }
}
