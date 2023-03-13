import { IsNumber, IsNotEmpty, IsDate, IsOptional, IsBoolean, IsString } from "class-validator";
import { GoalProgressDaily } from "./";

export class DailyDiet {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    mealType: number;

    @IsNotEmpty()
    @IsNumber()
    calorie: number;

    @IsNotEmpty()
    @IsDate()
    recordedAt: Date;

    @IsNotEmpty()
    @IsDate()
    createdAt: Date;

    @IsOptional()
    @IsDate()
    updatedAt?: Date;

    @IsOptional()
    @IsBoolean()
    isDelete?: boolean;

    @IsOptional()
    progressDaily: GoalProgressDaily;

    @IsNotEmpty()
    @IsString()
    progressDailyId: string;
}
