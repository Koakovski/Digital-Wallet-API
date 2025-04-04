import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserAuthGuard } from '../user/authorization/user-auth.guard';
import { AuthUser } from '../user/authorization/auth-user.decorator';
import { AuthenticatedUserPayload } from 'src/domain/usecases/user/user.login.usecase';
import { TransactionCreateByTransferUseCase } from 'src/domain/usecases/transaction/transaction.create-by-transfer.usecase';
import { TransactionCreateByTransferDto } from './dtos/transaction.create-by-transfer.dto';
import { TransactionFindPaginatedOfUserUseCase } from 'src/domain/usecases/transaction/transaction.find-paginated-of-user.usecase';
import { PaginatedPresenter } from '../_common/presenters/paginated/paginated.presenter';
import { TransactionFindAllPaginatedOfUserQueryDto } from './dtos/transaction.find-all-paginated-of-user.query.dto';
import { PaginationRequest } from 'src/domain/base/paginated';
import { PaginatedTransactionAggregatePresentableEntity } from './presenters/aggregate/transaction.aggregate.paginated.presentable-entity';
import { TransactionAggregatePresenter } from './presenters/aggregate/transaction.aggregate.presenter';
import { TransactionAggregatePresentableEntity } from './presenters/aggregate/transaction.aggregate.presentable-entity';
import { TransactionCreateByCancelUseCase } from 'src/domain/usecases/transaction/transaction.create-by-cancell.usecase';
import { PermissionGuard } from 'src/infra/permissions/permission.guard';
import { Permission } from 'src/infra/permissions/permission.decorator';
import {
  TransactionDataFetcher,
  TransactionDataFetcherParams,
} from '../../domain/permissions/data-fetchers/transaction.data-fetcher';
import { QueryConverter } from 'src/domain/helpers/query-converter';
@ApiTags('transaction')
@Controller('/transactions')
export class TransactionController {
  constructor(
    private readonly transactionCreateByTransferUseCase: TransactionCreateByTransferUseCase,
    private readonly transactionFindPaginatedOfUserUseCase: TransactionFindPaginatedOfUserUseCase,
    private readonly transactionCreateByCancelUseCase: TransactionCreateByCancelUseCase,
  ) {}

  @Post('/transfer')
  @UseGuards(UserAuthGuard)
  @ApiOperation({
    description: 'Authenticated User transfer value to another user',
  })
  @ApiOkResponse({
    type: TransactionAggregatePresentableEntity,
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

    return new TransactionAggregatePresenter(transaction).toPresent();
  }

  @Get('/')
  @UseGuards(UserAuthGuard)
  @ApiOperation({ description: 'Get all transactions of authenticated User' })
  @ApiOkResponse({
    type: PaginatedTransactionAggregatePresentableEntity,
    isArray: true,
  })
  @ApiBearerAuth()
  async findPagintedTransactionsOfUser(
    @AuthUser() authUser: AuthenticatedUserPayload,
    @Query() query: TransactionFindAllPaginatedOfUserQueryDto,
  ): Promise<PaginatedTransactionAggregatePresentableEntity> {
    const paginatedTransactions =
      await this.transactionFindPaginatedOfUserUseCase.execute({
        userId: authUser.id,
        receiverIds: query.receiver_ids,
        role: query.role,
        paginationRequest: new PaginationRequest(
          QueryConverter.toNumberIfExists(query.page),
          QueryConverter.toNumberIfExists(query.per_page),
        ),
      });

    return new PaginatedPresenter(paginatedTransactions).mapData(
      (transaction) =>
        new TransactionAggregatePresenter(transaction).toPresent(),
    );
  }

  @Patch('/cancel/:transactionId')
  @UseGuards(UserAuthGuard, PermissionGuard)
  @Permission<'transaction', TransactionDataFetcherParams>({
    resource: 'transaction',
    action: 'update',
    dataFetcher: {
      extractParams: (req) => ({ transactionId: req.params.transactionId }),
      handler: TransactionDataFetcher,
    },
  })
  @ApiOperation({ description: 'Cancel a transaction by its ID' })
  @ApiOkResponse({
    type: TransactionAggregatePresentableEntity,
  })
  @ApiBearerAuth()
  async cancelTransaction(@Param('transactionId') transactionId: string) {
    const transaction = await this.transactionCreateByCancelUseCase.execute({
      transactionId,
    });

    return new TransactionAggregatePresenter(transaction).toPresent();
  }
}
