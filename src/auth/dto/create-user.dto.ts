import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    name!: string;
    
    @ApiProperty()
    @IsString()
    email!: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    password!: string;
}