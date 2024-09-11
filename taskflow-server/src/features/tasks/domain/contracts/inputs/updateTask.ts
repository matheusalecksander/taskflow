import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IUser } from 'src/_core/auth/interfaces/user.interface';
import { TaskStatus } from '../../enuns/taskStatus';

export class UpdateTask {
  user: IUser;
  taskId: string;

  @ApiPropertyOptional({
    description: 'Nome da tarefa que deseja criar',
    example: 'CRUD de usuários',
  })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Descrição da tarefa que deseja criar',
    example:
      'Realizar a criação de endpoints para que seja possível gerenciar usuários na plataforma',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'ID do responsável pela tarefa',
  })
  responsibleId?: string;

  @ApiPropertyOptional({
    description: 'Status atual da tarefa',
    enum: TaskStatus,
    example: TaskStatus.COMPLETED,
  })
  status?: TaskStatus;
}
