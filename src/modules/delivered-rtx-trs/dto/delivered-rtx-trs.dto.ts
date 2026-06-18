import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateDeliveredRtxTrsDto {
    @ApiPropertyOptional() van?: number;
    @ApiPropertyOptional() ambulance?: number;
    @ApiPropertyOptional() minibus?: number;
}
