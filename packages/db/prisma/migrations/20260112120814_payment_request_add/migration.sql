-- CreateEnum
CREATE TYPE "PaymentReqStatus" AS ENUM ('PENDING', 'PAID', 'DECLINED');

-- CreateTable
CREATE TABLE "PaymentReq" (
    "id" TEXT NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "PaymentReqStatus" NOT NULL,

    CONSTRAINT "PaymentReq_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaymentReq" ADD CONSTRAINT "PaymentReq_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentReq" ADD CONSTRAINT "PaymentReq_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
