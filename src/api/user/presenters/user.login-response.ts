import { ApiProperty } from '@nestjs/swagger';
import { UserPresentableEntity } from './user.presentable-entity';

export class UserLoginResponse {
  @ApiProperty({
    description: 'JWT Token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token: string;

  @ApiProperty({
    description: 'User information',
    type: UserPresentableEntity,
  })
  user: UserPresentableEntity;
}
