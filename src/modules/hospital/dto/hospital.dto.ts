import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsNumber, IsArray, IsNotEmpty } from "class-validator";

export class CreateHospitalDto {
    @ApiProperty({ description: "CNES do estabelecimento (7 dígitos)" })
    @IsString()
    @IsNotEmpty()
    cnes!: string;
}

export class BulkCreateHospitalDto {
    @ApiProperty({ description: "Array de CNES para importação em massa", type: [String] })
    @IsArray()
    cnesList!: string[];
}

export class UpdateHospitalTomoDto {
    @ApiPropertyOptional() @IsOptional() @IsString() status?: string;
    @ApiPropertyOptional() @IsOptional() @IsString() contract?: string;
    @ApiPropertyOptional() @IsOptional() @IsString() structure90Days?: string;
    @ApiPropertyOptional() @IsOptional() @IsString() formSent?: string;
    @ApiPropertyOptional() @IsOptional() @IsString() formReceived?: string;
    @ApiPropertyOptional() @IsOptional() @IsString() contactNotes?: string;
    @ApiPropertyOptional() @IsOptional() @IsString() contactResponsible?: string;
    @ApiPropertyOptional() @IsOptional() @IsString() priorityGroup?: string;
    @ApiPropertyOptional() @IsOptional() @IsNumber() deliveryOrder?: number | null;
    @ApiPropertyOptional() @IsOptional() @IsString() construction?: string;
    @ApiPropertyOptional() @IsOptional() @IsString() installed?: string;
}

export class UpdateHospitalRnmDto {
    @ApiPropertyOptional() @IsOptional() @IsString() status?: string;
    @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}
