import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDate, IsBoolean } from "class-validator";
import { UserDto, CategoryDto, TagDto, CommentDto } from "./";

export class PostDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    likes?: number;

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
    author: UserDto;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    authorId: string;

    @ApiProperty({ required: true, type: () => CategoryDto })
    @IsOptional()
    categories: CategoryDto[];

    @ApiProperty({ required: true, type: () => TagDto })
    @IsOptional()
    tags: TagDto[];

    @ApiProperty({ required: true, type: () => CommentDto })
    @IsOptional()
    comments: CommentDto[];
}
