import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDate, IsBoolean } from "class-validator";
import { User, DailyDiet } from "./";

export class GoalProgressDaily {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsOptional()
    @IsNumber()
    calorie?: number;

    @IsOptional()
    @IsNumber()
    weight?: number;

    @IsOptional()
    @IsNumber()
    bodyFat?: number;

    @IsOptional()
    @IsNumber()
    progress?: number;

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
    user: User;

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsOptional()
    dailyDiets: DailyDiet[];
}
