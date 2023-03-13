import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsDate, IsOptional, IsBoolean } from "class-validator";
import { UserDto } from "./";

export class DiaryDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    content: string;

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
    createdBy: UserDto;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    createdById: string;
}
