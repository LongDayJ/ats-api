import { Body, Controller, Get, Param, ParseIntPipe, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UfService } from "./uf.service";
import { UpdateUfDto } from "./dto/uf.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";

@ApiTags("uf")
@ApiBearerAuth("bearer")
@UseGuards(JwtAuthGuard)
@Controller("/uf")
export class UfController {
    constructor(private readonly service: UfService) {}

    @Get()
    @ApiOperation({ summary: "Listar todas as UFs" })
    findAll() { return this.service.findAll(); }

    @Get(":id")
    @ApiOperation({ summary: "Buscar UF por ID" })
    findById(@Param("id", ParseIntPipe) id: number) { return this.service.findById(id); }

    @Put(":id")
    @UseGuards(RolesGuard)
    @Roles("admin", "gestor")
    @ApiOperation({ summary: "Atualizar agreement e cib de uma UF" })
    update(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateUfDto) {
        return this.service.update(id, body);
    }
}
