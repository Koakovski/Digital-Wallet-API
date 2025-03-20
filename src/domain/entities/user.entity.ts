import { Entity } from '../base/entity';
import { InsufficientBalanceException } from '../exceptions/user/user.insufficient-balance.exception';

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

  removeBalance(value: number) {
    if (this.props.balance - value < 0) {
      throw new InsufficientBalanceException(
        `User with id ${this.id} do not have enough balance balance to complete the transaction`,
      );
    }

    this.props.balance -= value;
  }

  addBalance(value: number) {
    this.props.balance += value;
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
