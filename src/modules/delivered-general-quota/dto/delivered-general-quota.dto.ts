import { ApiProperty, PartialType } from "@nestjs/swagger";

export class DeliveredGeneralQuotaDto {
    @ApiProperty() ufId!: number;
    @ApiProperty({ default: 0 }) van!: number;
    @ApiProperty({ default: 0 }) ambulance!: number;
    @ApiProperty({ default: 0 }) microbus!: number;
}

export class UpdateDeliveredGeneralQuotaDto extends PartialType(DeliveredGeneralQuotaDto) {}
