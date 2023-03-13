import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDate, IsBoolean } from "class-validator";
import { UserDto, DailyDietDto } from "./";

export class GoalProgressDailyDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    calorie?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    weight?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    bodyFat?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    progress?: number;

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

    @ApiProperty({ required: true, type: () => DailyDietDto })
    @IsOptional()
    dailyDiets: DailyDietDto[];
}
