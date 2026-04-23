"use server"
import { success } from "zod";
import { auth } from "../auth";
import {prisma, } from "@repo/db";

export async function p2pTransfer(to: string, amount: number) {
    const session = await auth();
    const from = session?.user?.id;
    if (!from) {
        return {
            message: "Error while sending"
        }
    }
    
    const toUser = await prisma.user.findFirst({
       where:{
        email:to
       }
    });
    console.log(to);
    //console.log(to);

    // console.log(toUser);
    if (!toUser) {
        return {
            message: "User not found"
        }
    }
      console.log(from);
          console.log(toUser);
    await prisma.$transaction(async (tx) => {
         await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${(from)} FOR UPDATE`;

        const fromBalance = await tx.balance.findUnique({
            where: { userId: (from) },
          });
          console.log(fromBalance);
          console.log(toUser);
          const amountInPaise = Math.round(amount * 100);
          if (!fromBalance || fromBalance.amount < amountInPaise) {
            throw new Error('Insufficient funds');
          }

          await tx.balance.update({
            where: { userId: (from) },
            data: { amount: { decrement: (amount)*100 } },
          });

          await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: (amount)*100 } },
          });

          await tx.p2pTransfer.create({
            data:{
                amount : amount*100
                ,fromUserId : (from),
                timestamp : new Date(),
                toUserId : toUser.id,
                status : "success"
            }
          })
    });

}