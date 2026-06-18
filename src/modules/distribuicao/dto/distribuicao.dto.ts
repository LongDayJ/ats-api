import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateDistribuicaoRtxDto {
    @ApiPropertyOptional() van?: number;
    @ApiPropertyOptional() ambulance?: number;
    @ApiPropertyOptional() minibus?: number;
}

export class UpdateDistribuicaoTrsDto {
    @ApiPropertyOptional() van?: number;
    @ApiPropertyOptional() microbus?: number;
}

export class UpdateDistribuicaoDto {
    @ApiPropertyOptional() rtx?: UpdateDistribuicaoRtxDto;
    @ApiPropertyOptional() trs?: UpdateDistribuicaoTrsDto;
}
