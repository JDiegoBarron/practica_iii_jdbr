import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ClientResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Juan Pérez' })
  name!: string;

  @ApiPropertyOptional({ example: 25 })
  age?: number;

  @ApiProperty({ example: 'juan@correo.com' })
  email!: string;

  // Nota: Aquí NO incluimos campos internos ni contraseñas
}