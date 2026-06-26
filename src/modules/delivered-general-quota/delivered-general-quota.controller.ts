import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { DeliveredGeneralQuotaService } from "./delivered-general-quota.service";
import { DeliveredGeneralQuotaDto, UpdateDeliveredGeneralQuotaDto } from "./dto/delivered-general-quota.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";

@ApiTags("delivered-general-quota")
@ApiBearerAuth("bearer")
@UseGuards(JwtAuthGuard)
@Controller("/delivered-general-quota")
export class DeliveredGeneralQuotaController {
    constructor(private readonly service: DeliveredGeneralQuotaService) {}

    @Get() @ApiOperation({ summary: "Listar entregas Cota Geral" })
    findAll() { return this.service.findAll(); }

    @Get(":id")
    findById(@Param("id", ParseIntPipe) id: number) { return this.service.findById(id); }

    @Post() @UseGuards(RolesGuard) @Roles("admin", "gestor_transporte", "gestor_all")
    create(@Body() body: DeliveredGeneralQuotaDto) { return this.service.create(body); }

    @Put(":id") @UseGuards(RolesGuard) @Roles("admin", "gestor_transporte", "gestor_all")
    update(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateDeliveredGeneralQuotaDto) {
        return this.service.update(id, body);
    }

    @Delete(":id") @UseGuards(RolesGuard) @Roles("admin")
    remove(@Param("id", ParseIntPipe) id: number) { return this.service.remove(id); }
}
