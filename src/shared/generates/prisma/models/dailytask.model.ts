import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsDate, IsOptional } from "class-validator";
import { User } from "./";

export class DailyTask {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    taskName: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    taskType: number;

    @IsNotEmpty()
    @IsBoolean()
    taskStatus: boolean;

    @IsOptional()
    @IsDate()
    completedDate?: Date;

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
    createdBy: User;

    @IsNotEmpty()
    @IsString()
    createdById: string;
}
