import { Entity } from '../base/entity';
import { InsufficientBalanceException } from '../exceptions/user/user.insufficient-balance.exception';

export type UserEntityProps = {
  name: string;
  email: string;
  password: string;
  balanceInCents: number;
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

  get balanceInCents() {
    return this.props.balanceInCents;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  removeBalance(value: number) {
    if (this.props.balanceInCents - value < 0) {
      throw new InsufficientBalanceException(
        `User with id ${this.id} do not have enough balance to complete the transaction`,
      );
    }

    this.props.balanceInCents -= value;
  }

  addBalance(value: number) {
    this.props.balanceInCents += value;
  }

  static new(props: UserEntityNewProps) {
    const initialBalance = 100;
    const balanceInCents = initialBalance * 100;

    return UserEntity.create({
      name: props.name,
      email: props.email,
      balanceInCents,
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
