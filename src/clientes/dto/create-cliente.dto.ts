import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsNumber, MinLength } from 'class-validator';

export class CreateClienteDto {
    @ApiProperty({ example: 'Juan Pérez' })
    @IsString()
    @MinLength(3)
    nombre!: string; 

    @ApiPropertyOptional({ example: 25 })
    @IsNumber()
    @IsOptional()
    edad?: number; 

    @ApiProperty({ example: 'juan@correo.com' })
    @IsEmail()
    email!: string; 
    
    @ApiProperty({ example: '+521234567890' })
    @IsString()
    telefono!: string; 
}