import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IUser } from 'src/_core/auth/interfaces/user.interface';

export class CreateTask {
  user: IUser;

  @ApiProperty({
    description: 'Nome da tarefa que deseja criar',
    example: 'CRUD de usuários',
  })
  @IsNotEmpty({
    message: 'O nome da tarefa não pode ser vazio',
  })
  @IsString({
    message: 'O nome da tarefa deve ser uma string',
  })
  name: string;

  @ApiProperty({
    description: 'Descrição da tarefa que deseja criar',
    example:
      'Realizar a criação de endpoints para que seja possível gerenciar usuários na plataforma',
  })
  @IsNotEmpty({
    message: 'A descrição da tarefa não pode ser vazio',
  })
  @IsString({
    message: 'A descrição da tarefa deve ser uma string',
  })
  description: string;

  @ApiPropertyOptional({
    description: 'ID do responsável pela tarefa',
  })
  responsibleId?: string;
}
