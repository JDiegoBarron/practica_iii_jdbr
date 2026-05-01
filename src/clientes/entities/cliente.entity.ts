import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cliente{
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty()
    @Column()
    nombre!: string; 

    @ApiProperty()
    @Column({nullable:true})
    edad?: number; 

    @ApiProperty()
    @Column({unique:true})
    email!: string; 
    
    @ApiProperty()
    @Column()
    telefono!: string; 
}