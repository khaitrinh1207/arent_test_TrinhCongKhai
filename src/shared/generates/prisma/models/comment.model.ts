import { IsString, IsNotEmpty, IsDate, IsOptional, IsBoolean } from "class-validator";
import { User, Post } from "./";

export class Comment {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    content: string;

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

    @IsOptional()
    post: Post;

    @IsNotEmpty()
    @IsString()
    postId: string;
}
