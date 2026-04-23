
"use server"
import { auth } from "@/auth";
import { prisma,  } from "@repo/db";
export async function createRequest(toUserId: string, amount: number, note?: string) {
  const session = await auth()
  const fromUserId = session?.user?.id

  if (!fromUserId) {
    throw new Error("Unauthorized")
  }

  await prisma.paymentReq.create({
    data: {
      fromUserId,
      toUserId,
      amount: amount * 100,
      note :"",
      status:"PENDING"
    }
  })
}
export async function getMyReq(){
 const session = await auth()
  const fromUserId = session?.user?.id
const res = await  prisma.paymentReq.findMany({
    where : {
        toUserId :fromUserId,
        status : "PENDING"
    },
    include :{
        fromUser :true
    },
    orderBy :{
        createdAt : "desc"
    }

})
return res;
}

export async function declineReq(id:string) {
    await prisma.paymentReq.update({
        where:{
            id : id
        },
        data:{
            status : "DECLINED"
        }
    })
} 