import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
    @ApiBody({type: CreateUserDto})
    
    @ApiCreatedResponse({
      type: User, 
      description: "El registro es exitoso, y se creo en la base de datos. Regresa el usuario creado, con la contraseña hash y el ID (problemático)"
    })

    @ApiBadRequestResponse({
      description: "Falta algún campo, el email no tiene formato correcto o la contraseña no tiene mínimo 8 caracteres"
    })

    @ApiConflictResponse({
      description: "El correo ya existe en la base de datos"
    })

    @Post('/register')
      create(@Body() createUserDto: CreateUserDto) {
      return this.authService.create(createUserDto);
    }


    @ApiBody({type: LoginUserDto})
    @ApiCreatedResponse({
      description: "Se realizó el inicio de sesión. Regresa el token generado (problemático)",
      schema:{
        example:{
          token: "string"
        }
      }
    })

    @ApiNotFoundResponse({
      description: "El usuario no se encuentra en la base de datos"
    })

    @ApiUnauthorizedResponse({
      description: "La contraseña es incorrecta" 
    })


    @Post('/login')
      login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.loginUser(loginUserDto);
    } 


    @ApiBearerAuth()
    
    @ApiUnauthorizedResponse({
      description: "Sucede cuando no existe token, el token es inválido, o está expirado"
    })

    @ApiCreatedResponse({
      description: "Regresa una cadena de texto, donde se muestra el nombre de usuario asociado al token de la sesión"
    })

    @ApiBody({
      schema: {
        example:{
          token : "string"
        }
      }
    })

    @Get('/profile')
    @UseGuards(AuthGuard)
    profile(){
      return 'Perfil del usuario solo con token';
    }
  /* 
  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }*/
}
