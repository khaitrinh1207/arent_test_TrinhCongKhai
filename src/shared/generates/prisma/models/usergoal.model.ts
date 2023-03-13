import { IsString, IsNotEmpty, IsNumber, IsDate, IsOptional, IsBoolean } from "class-validator";
import { User } from "./";

export class UserGoal {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsNumber()
    calorie: number;

    @IsNotEmpty()
    @IsNumber()
    weight: number;

    @IsNotEmpty()
    @IsNumber()
    bodyFat: number;

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
}
