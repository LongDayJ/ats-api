import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { TransportRtxService } from "./transport-rtx.service";
import { TransportRtxDto, UpdateTransportRtxDto } from "./dto/transport-rtx.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";

@ApiTags("transport-rtx")
@ApiBearerAuth("bearer")
@UseGuards(JwtAuthGuard)
@Controller("/transport-rtx")
export class TransportRtxController {
    constructor(private readonly service: TransportRtxService) {}

    @Get() @ApiOperation({ summary: "Listar transporte RTx" })
    findAll() { return this.service.findAll(); }

    @Get(":id")
    findById(@Param("id", ParseIntPipe) id: number) { return this.service.findById(id); }

    @Post() @UseGuards(RolesGuard) @Roles("admin", "gestor")
    create(@Body() body: TransportRtxDto) { return this.service.create(body); }

    @Put(":id") @UseGuards(RolesGuard) @Roles("admin", "gestor")
    update(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateTransportRtxDto) {
        return this.service.update(id, body);
    }

    @Delete(":id") @UseGuards(RolesGuard) @Roles("admin")
    remove(@Param("id", ParseIntPipe) id: number) { return this.service.remove(id); }
}
