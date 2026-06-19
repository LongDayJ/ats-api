import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUfDto {
    @ApiPropertyOptional({ example: "ESTADO" })
    agreement?: string;

    @ApiPropertyOptional({ enum: ["Sim", "Não", "Em andamento"] })
    cib?: string;

}
