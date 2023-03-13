import { IsString, IsNotEmpty, IsDate, IsOptional } from "class-validator";
import { Post } from "./";

export class Category {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    subTitle: string;

    @IsNotEmpty()
    @IsDate()
    createdAt: Date;

    @IsOptional()
    @IsDate()
    updatedAt?: Date;

    @IsOptional()
    posts: Post[];
}
