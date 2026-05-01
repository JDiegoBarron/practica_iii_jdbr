import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private repo: Repository<User>,
  private jwtService: JwtService){
  }

  async generateToken(userId){
    const accesToken = this.jwtService.sign({userId});
    return {
      accesToken
    }
  }

  async loginUser(loginUserDto:LoginUserDto) {
    const {email, password } = loginUserDto;
    const user = await this.repo.findOneBy({email})

    if(!user){
      const error={
        "message":["Usuario no encontrado"], 
        "error":"No autorizado", 
        "statusCode":403
      }
      throw new UnauthorizedException(error);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if(!passwordMatch){
      const error={
        "message":["Clave incorrecta"], 
        "error":"No autorizado", 
        "statusCode":403
      }
      throw new UnauthorizedException(error);
    }

    return this.generateToken(user.id);
  }

  //Metodo que revisa si la solicitud trae o no el Token
  private extractTokenFromHeader(request:Request){
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type==='Bearer' ? token : undefined;

  }

  async create(createUserDto: CreateUserDto) {
    // Desestructurar 
    const numRound = 10

    const {email, password} = createUserDto; 
    // Verificar que el email no existe 
    const emailExist = await this.repo.findOneBy({email})
    if(emailExist){
      const error = {
        "statusCode": 409,
        "error": "Conflict",
        "message": ["El email ya existe"] 
      }
      throw new ConflictException(error) 
    }
    // Encriptar la contraseña
    const hashPassword = await bcrypt.hash(password, numRound)
    createUserDto.password = hashPassword; 

    // Guardar en la base de datos 
    return this.repo.save(createUserDto);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
