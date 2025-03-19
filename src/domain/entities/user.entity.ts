import { Entity } from '../base/entity';

export type UserEntityProps = {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserEntityNewProps = {
  name: string;
  email: string;
  password: string;
};

export class UserEntity extends Entity<UserEntityProps> {
  static new(props: UserEntityNewProps) {
    return UserEntity.create({
      name: props.name,
      email: props.email,
      password: props.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static recover(props: UserEntityProps, id: string) {
    return UserEntity.create(props, id);
  }

  private static create(props: UserEntityProps, id?: string) {
    return new UserEntity(props, id);
  }
}
