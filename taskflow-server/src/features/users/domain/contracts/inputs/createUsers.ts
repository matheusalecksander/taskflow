import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUser {
  @ApiProperty({
    description: 'Nome do usuário a ser cadastrado',
    example: 'Matheus Alecksander',
  })
  @IsNotEmpty({
    message: 'name: informar o nome do usuário é obrigatório',
  })
  name: string;

  @ApiProperty({
    description: 'Email do usuário a ser cadastrado',
    example: 'email@email.com',
  })
  @IsNotEmpty({
    message: 'email: informar o email do usuário é obrigatório',
  })
  @IsEmail(
    {},
    {
      message: 'email: informar um email válido',
    },
  )
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '123456',
  })
  @IsNotEmpty({
    message: 'password: informar a senha do usuário é obrigatório',
  })
  @MinLength(6, {
    message: 'password: a senha deve ter no mínimo 8 caracteres',
  })
  password: string;
}
