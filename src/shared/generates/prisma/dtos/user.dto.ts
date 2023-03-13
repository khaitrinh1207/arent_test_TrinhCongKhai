import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsDate, IsNumber, IsBoolean } from "class-validator";
import { UserGoalDto, PostDto, CommentDto, WeightDto, CalorieDto, BodyFatDto, GoalProgressDailyDto, TagDto, DiaryDto, DailyTaskDto } from "./";

export class UserDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    email?: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDate()
    birthday?: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    gender?: number;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsDate()
    createdAt: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsDate()
    updatedAt?: Date;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsBoolean()
    isAdmin: boolean;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    isDelete?: boolean;

    @ApiProperty({ required: false, type: () => UserGoalDto })
    @IsOptional()
    goal?: UserGoalDto;

    @ApiProperty({ required: true, type: () => PostDto })
    @IsOptional()
    posts: PostDto[];

    @ApiProperty({ required: true, type: () => CommentDto })
    @IsOptional()
    comments: CommentDto[];

    @ApiProperty({ required: true, type: () => WeightDto })
    @IsOptional()
    weights: WeightDto[];

    @ApiProperty({ required: true, type: () => CalorieDto })
    @IsOptional()
    calories: CalorieDto[];

    @ApiProperty({ required: true, type: () => BodyFatDto })
    @IsOptional()
    bodyFats: BodyFatDto[];

    @ApiProperty({ required: true, type: () => GoalProgressDailyDto })
    @IsOptional()
    progressDailies: GoalProgressDailyDto[];

    @ApiProperty({ required: true, type: () => TagDto })
    @IsOptional()
    tags: TagDto[];

    @ApiProperty({ required: true, type: () => DiaryDto })
    @IsOptional()
    diaries: DiaryDto[];

    @ApiProperty({ required: true, type: () => DailyTaskDto })
    @IsOptional()
    dailyTasks: DailyTaskDto[];
}
