import { UserEntity } from 'src/domain/entities/user.entity';
import { UserPresentableEntity } from './user.presentable-entity';

export class UserPresenter {
  constructor(private readonly user: UserEntity) {}

  toPresent(): UserPresentableEntity {
    return {
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      created_at: this.user.createdAt,
      updated_at: this.user.updatedAt,
    };
  }
}
