import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, IsDate, IsOptional, IsBoolean } from "class-validator";
import { UserDto } from "./";

export class UserGoalDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    calorie: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    weight: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    bodyFat: number;

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
