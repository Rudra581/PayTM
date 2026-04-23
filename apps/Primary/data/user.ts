
"use server"
import { prisma } from "@repo/db";
import { id } from "zod/v4/locales";
import { auth } from "@/auth";
export const getUser = async()=>{
    try{
        const session = auth();
        const user = session.user;
        return user;
    }
    catch(e){
        console.log(e);
    }
   
}
export const getUserByEmail = async (email: string) => {
    try {
        const lowerCaseEmail = email.toLowerCase();
        const user = await prisma.user.findUnique({
            where: {
                email: lowerCaseEmail
            }
        })

        return user;
    } catch (error) {
        return null
    }
}

export const getUserById = async (id:string) => {
    try {
        const user = await prisma.user.findUnique({
        where: {
            id
        }
    }); 

    return user;
    } catch (error) {
        return null
    }
}
export const getAllUser = async()=>{
    try{
        const AllUser = await prisma.user.findMany({
            select :{
                id : true,
                email : true,
                name : true
            }
        })
        return AllUser;
    }
    catch(e){
        return null
    }
}

export const getBalanceByuserid = async(id : string)=>{
    try{
        const balance = await prisma.balance.findFirst({
            where :{
                userId : id
            }
        })
        return balance;
    }
    catch (err){
        console.log(err);
    }
}


export async function getTransactions(userId : string){
    
const [onramps, p2ps] = await Promise.all([
  prisma.onRampTransaction.findMany({
    where: { userId },
    select: {
      id: true,
      amount: true,
      startTime: true,
      status: true
    }
  }),

  prisma.p2pTransfer.findMany({
    where: {
      OR: [
        { fromUserId: userId },
        { toUserId: userId }
      ]
    },
    include: {
      fromUser: { select: { name: true } },
      toUser: { select: { name: true } }
    }
  })
])

console.log(onramps , p2ps)

const credits = onramps.map(txn => ({
  id: txn.id,
  amount: txn.amount,
  time: txn.startTime,
  type: "CREDIT",
  source: "ONRAMP",
  status: txn.status.toLocaleLowerCase(),
  label: "Wallet Top-up"
}))


const transfers = p2ps.map(txn => {
  const isDebit = txn.fromUserId === userId
  return {
    id: txn.id,
    amount: txn.amount,
    time: txn.timestamp,
    type: isDebit ? "DEBIT" : "CREDIT",
    source: "P2P",
    status: txn.status,
    label: isDebit
      ? `${txn.toUser.name}`
      : `${txn.fromUser.name}`
  }
})
const history = [...credits, ...transfers].sort(
  (a, b) => b.time.getTime() - a.time.getTime()
)
return history;
}

