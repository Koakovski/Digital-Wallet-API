import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserAuthGuard } from '../user/authorization/user-auth.guard';
import { TransactionPresentableEntity } from './presenters/transaction.presentable-entity';
import { AuthUser } from '../user/authorization/auth-user.decorator';
import { AuthenticatedUserPayload } from 'src/domain/usecases/user/user.login.usecase';
import { TransactionEntity } from 'src/domain/entities/transaction.entity';
import { TransactionPresenter } from './presenters/transaction.presenter';
import { TransactionCreateByTransferUseCase } from 'src/domain/usecases/transaction/transaction.create.usecase';
import { TransactionCreateByTransferDto } from './dtos/transaction.create-by-transfer.dto';

@ApiTags('transaction')
@Controller('/transactions')
export class TransactionController {
  constructor(
    private readonly transactionCreateByTransferUseCase: TransactionCreateByTransferUseCase,
  ) {}

  @Post('/transfer')
  @UseGuards(UserAuthGuard)
  @ApiOperation({
    description: 'Authenticated User transfer value to another user',
  })
  @ApiOkResponse({
    type: TransactionPresentableEntity,
  })
  @ApiBearerAuth()
  async transfer(
    @AuthUser() authUser: AuthenticatedUserPayload,
    @Body() body: TransactionCreateByTransferDto,
  ) {
    const transaction = await this.transactionCreateByTransferUseCase.execute({
      receiverId: authUser.id,
      senderId: body.receiver_id,
      valueInCents: body.value_in_cents,
    });

    return new TransactionPresenter(transaction.root).toPresent();
  }

  @Get('/')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ description: 'Get all transactions of authorized User' })
  @ApiOkResponse({
    type: TransactionPresentableEntity,
    isArray: true,
  })
  @ApiBearerAuth()
  async findAllTransactionsOfUser(
    @AuthUser() _authUser: AuthenticatedUserPayload,
  ): Promise<TransactionPresentableEntity[]> {
    const transactions: TransactionEntity[] = [];
    return transactions.map((transaction) =>
      new TransactionPresenter(transaction).toPresent(),
    );
  }
}
