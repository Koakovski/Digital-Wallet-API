import { ApiProperty } from '@nestjs/swagger';

export class UserPresentableEntity {
  @ApiProperty({
    description: 'Unique identifier of the user',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'johndoe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Date when the user was created',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Date when the user was last updated',
  })
  updated_at: Date;
}
