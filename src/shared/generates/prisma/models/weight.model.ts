import { IsNumber, IsNotEmpty, IsDate, IsOptional, IsBoolean, IsString } from "class-validator";
import { User } from "./";

export class Weight {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    value: number;

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
}
