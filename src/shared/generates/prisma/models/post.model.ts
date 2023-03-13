import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDate, IsBoolean } from "class-validator";
import { User, Category, Tag, Comment } from "./";

export class Post {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsOptional()
    @IsNumber()
    likes?: number;

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
    author: User;

    @IsNotEmpty()
    @IsString()
    authorId: string;

    @IsOptional()
    categories: Category[];

    @IsOptional()
    tags: Tag[];

    @IsOptional()
    comments: Comment[];
}
