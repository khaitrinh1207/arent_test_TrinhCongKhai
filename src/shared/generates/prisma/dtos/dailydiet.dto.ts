import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty, IsDate, IsOptional, IsBoolean, IsString } from "class-validator";
import { GoalProgressDailyDto } from "./";

export class DailyDietDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    mealType: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    calorie: number;

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

    @ApiProperty({ required: true, type: () => GoalProgressDailyDto })
    @IsOptional()
    progressDaily: GoalProgressDailyDto;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    progressDailyId: string;
}
