/*
  Warnings:

  - A unique constraint covering the columns `[cancellation_transaction_id]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "cancellation_transaction_id" UUID,
ADD COLUMN     "cancelled_at" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "transactions_cancellation_transaction_id_key" ON "transactions"("cancellation_transaction_id");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_cancellation_transaction_id_fkey" FOREIGN KEY ("cancellation_transaction_id") REFERENCES "transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
