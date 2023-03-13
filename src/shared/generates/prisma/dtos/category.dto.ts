import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsDate, IsOptional } from "class-validator";
import { PostDto } from "./";

export class CategoryDto {
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
    subTitle: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsDate()
    createdAt: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDate()
    updatedAt?: Date;

    @ApiProperty({ required: true, type: () => PostDto })
    @IsOptional()
    posts: PostDto[];
}
