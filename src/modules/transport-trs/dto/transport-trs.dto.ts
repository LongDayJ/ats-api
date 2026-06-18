import { ApiProperty, PartialType } from "@nestjs/swagger";

export class TransportTrsDto {
    @ApiProperty() ufId!: number;
    @ApiProperty({ default: 0 }) van!: number;
    @ApiProperty({ default: 0 }) microbus!: number;
}

export class UpdateTransportTrsDto extends PartialType(TransportTrsDto) {}
