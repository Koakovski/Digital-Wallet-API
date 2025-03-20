import { Inject, Injectable } from '@nestjs/common';
import { TransactionAggregate } from 'src/domain/aggregates/transaction.aggregate';
import { UseCase } from 'src/domain/base/usecase';
import { UserNotFoundException } from 'src/domain/exceptions/user/user.not-found.exception';
import { TransactionAggregateRepository } from 'src/domain/repositories/transaction.aggregate.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';

@Injectable()
export class TransactionCreateUseCase
  implements UseCase<TransactionCreateUseCaseParams, TransactionAggregate>
{
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(TransactionAggregateRepository)
    private readonly transactionAggregateRepository: TransactionAggregateRepository,
  ) {}

  async execute(
    params: TransactionCreateUseCaseParams,
  ): Promise<TransactionAggregate> {
    const [sender, receiver] = await Promise.all([
      this.fetchUser(params.senderId),
      this.fetchUser(params.receiverId),
    ]);

    const transaction = TransactionAggregate.newByTransfer({
      sender,
      receiver,
      valueInCents: params.valueInCents,
    });

    return await this.transactionAggregateRepository.create(transaction);
  }

  private async fetchUser(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundException(`User with id ${userId} was not found`);
    }

    return user;
  }
}

export type TransactionCreateUseCaseParams = {
  senderId: string;
  receiverId: string;
  valueInCents: number;
};
