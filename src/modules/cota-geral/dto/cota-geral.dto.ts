import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateCotaGeralQuotaDto {
    @ApiPropertyOptional() van?: number;
    @ApiPropertyOptional() ambulance?: number;
    @ApiPropertyOptional() microbus?: number;
}

export class UpdateCotaGeralDto {
    @ApiPropertyOptional() generalQuota?: UpdateCotaGeralQuotaDto;
    @ApiPropertyOptional() deliveredGeneralQuota?: UpdateCotaGeralQuotaDto;
}
