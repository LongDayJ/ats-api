import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GeneralQuotaService } from "./general-quota.service";
import { GeneralQuotaDto, UpdateGeneralQuotaDto } from "./dto/general-quota.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";

@ApiTags("general-quota")
@ApiBearerAuth("bearer")
@UseGuards(JwtAuthGuard)
@Controller("/general-quota")
export class GeneralQuotaController {
    constructor(private readonly service: GeneralQuotaService) {}

    @Get() @ApiOperation({ summary: "Listar cotas gerais" })
    findAll() { return this.service.findAll(); }

    @Get(":id")
    findById(@Param("id", ParseIntPipe) id: number) { return this.service.findById(id); }

    @Post() @UseGuards(RolesGuard) @Roles("admin", "gestor_transporte", "gestor_all")
    create(@Body() body: GeneralQuotaDto) { return this.service.create(body); }

    @Put(":id") @UseGuards(RolesGuard) @Roles("admin", "gestor_transporte", "gestor_all")
    update(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateGeneralQuotaDto) {
        return this.service.update(id, body);
    }

    @Delete(":id") @UseGuards(RolesGuard) @Roles("admin")
    remove(@Param("id", ParseIntPipe) id: number) { return this.service.remove(id); }
}
