import { IsString, IsNotEmpty, IsOptional, IsDate, IsNumber, IsBoolean } from "class-validator";
import { UserGoal, Post, Comment, Weight, Calorie, BodyFat, GoalProgressDaily, Tag, Diary, DailyTask } from "./";

export class User {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsDate()
    birthday?: Date;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsNumber()
    gender?: number;

    @IsNotEmpty()
    @IsDate()
    createdAt: Date;

    @IsOptional()
    @IsDate()
    updatedAt?: Date;

    @IsNotEmpty()
    @IsBoolean()
    isAdmin: boolean;

    @IsOptional()
    @IsBoolean()
    isDelete?: boolean;

    @IsOptional()
    goal?: UserGoal;

    @IsOptional()
    posts: Post[];

    @IsOptional()
    comments: Comment[];

    @IsOptional()
    weights: Weight[];

    @IsOptional()
    calories: Calorie[];

    @IsOptional()
    bodyFats: BodyFat[];

    @IsOptional()
    progressDailies: GoalProgressDaily[];

    @IsOptional()
    tags: Tag[];

    @IsOptional()
    diaries: Diary[];

    @IsOptional()
    dailyTasks: DailyTask[];
}
