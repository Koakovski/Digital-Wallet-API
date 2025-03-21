import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
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
import { TransactionPresenter } from './presenters/transaction.presenter';
import { TransactionCreateByTransferUseCase } from 'src/domain/usecases/transaction/transaction.create.usecase';
import { TransactionCreateByTransferDto } from './dtos/transaction.create-by-transfer.dto';
import { PaginatedPresentableEntity } from '../_common/presenters/paginated/paginated.presentable-entity';
import { TransactionFindPaginatedOfUserUseCase } from 'src/domain/usecases/transaction/transaction.find-paginated-of-user.usecase';
import { PaginatedPresenter } from '../_common/presenters/paginated/paginated.presenter';
import { TransactionFindAllPaginatedOfUserQueryDto } from './dtos/transaction.find-all-paginated-of-user.query.dto';
import { PaginationRequest } from 'src/domain/base/paginated';

@ApiTags('transaction')
@Controller('/transactions')
export class TransactionController {
  constructor(
    private readonly transactionCreateByTransferUseCase: TransactionCreateByTransferUseCase,
    private readonly transactionFindPaginatedOfUserUseCase: TransactionFindPaginatedOfUserUseCase,
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
      receiverId: body.receiver_id,
      senderId: authUser.id,
      valueInCents: body.value_in_cents,
    });

    return new TransactionPresenter(transaction.root).toPresent();
  }

  @Get('/')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ description: 'Get all transactions of authorized User' })
  @ApiOkResponse({
    type: PaginatedPresentableEntity<TransactionPresentableEntity>,
    isArray: true,
  })
  @ApiBearerAuth()
  async findPagintedTransactionsOfUser(
    @AuthUser() authUser: AuthenticatedUserPayload,
    @Query() query: TransactionFindAllPaginatedOfUserQueryDto,
  ): Promise<PaginatedPresentableEntity<TransactionPresentableEntity>> {
    const paginatedTransactions =
      await this.transactionFindPaginatedOfUserUseCase.execute({
        userId: authUser.id,
        receiverIds: query.receiver_ids,
        role: query.role,
        paginationRequest: new PaginationRequest(
          Number(query.page),
          Number(query.per_page),
        ),
      });

    return new PaginatedPresenter(paginatedTransactions).mapData(
      (transaction) => new TransactionPresenter(transaction.root).toPresent(),
    );
  }
}
