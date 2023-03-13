import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty, IsDate, IsOptional, IsBoolean, IsString } from "class-validator";
import { UserDto } from "./";

export class BodyFatDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    value: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsDate()
    recordedAt: Date;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsDate()
    createdAt: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDate()
    updatedAt?: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    isDelete?: boolean;

    @ApiProperty({ required: true, type: () => UserDto })
    @IsOptional()
    user: UserDto;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    userId: string;
}
