import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsDate, IsOptional } from "class-validator";
import { UserDto } from "./";

export class DailyTaskDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    taskName: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    taskType: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsBoolean()
    taskStatus: boolean;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDate()
    completedDate?: Date;

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
