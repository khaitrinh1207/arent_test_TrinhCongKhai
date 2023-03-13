import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsDate, IsOptional, IsBoolean } from "class-validator";
import { UserDto, PostDto } from "./";

export class TagDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    name: string;

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
    createdBy: UserDto;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    createdById: string;

    @ApiProperty({ required: true, type: () => PostDto })
    @IsOptional()
    posts: PostDto[];
}
