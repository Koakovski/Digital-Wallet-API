import { Controller, Get, UseGuards } from '@nestjs/common';
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

@ApiTags('transaction')
@Controller('/transactions')
export class TransactionController {
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
