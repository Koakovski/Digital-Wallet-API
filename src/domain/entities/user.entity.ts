import { Entity } from '../base/entity';

export type UserEntityProps = {
  name: string;
  email: string;
  password: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
};

export type UserEntityNewProps = {
  name: string;
  email: string;
  password: string;
};

export class UserEntity extends Entity<UserEntityProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get balance() {
    return this.props.balance;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static new(props: UserEntityNewProps) {
    return UserEntity.create({
      name: props.name,
      email: props.email,
      balance: 0,
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
