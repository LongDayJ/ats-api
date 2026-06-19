import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";

export class TransportRtxDto {
    @ApiProperty() ufId!: number;
    @ApiProperty({ default: 0 }) van!: number;
    @ApiProperty({ default: 0 }) ambulance!: number;
    @ApiProperty({ default: 0 }) minibus!: number;
    @ApiPropertyOptional() observation?: string | null;
}

export class UpdateTransportRtxDto extends PartialType(TransportRtxDto) {}
