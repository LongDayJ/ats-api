import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { TransportTrsService } from "./transport-trs.service";
import { TransportTrsDto, UpdateTransportTrsDto } from "./dto/transport-trs.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";

@ApiTags("transport-trs")
@ApiBearerAuth("bearer")
@UseGuards(JwtAuthGuard)
@Controller("/transport-trs")
export class TransportTrsController {
    constructor(private readonly service: TransportTrsService) {}

    @Get() @ApiOperation({ summary: "Listar transporte TRS" })
    findAll() { return this.service.findAll(); }

    @Get(":id")
    findById(@Param("id", ParseIntPipe) id: number) { return this.service.findById(id); }

    @Post() @UseGuards(RolesGuard) @Roles("admin", "gestor_transporte", "gestor_all")
    create(@Body() body: TransportTrsDto) { return this.service.create(body); }

    @Put(":id") @UseGuards(RolesGuard) @Roles("admin", "gestor_transporte", "gestor_all")
    update(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateTransportTrsDto) {
        return this.service.update(id, body);
    }

    @Delete(":id") @UseGuards(RolesGuard) @Roles("admin")
    remove(@Param("id", ParseIntPipe) id: number) { return this.service.remove(id); }
}
