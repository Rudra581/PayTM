"use server"


import { auth} from "../auth";
import { prisma } from "@repo/db";

export async function CreateOnRamptxn(amount : number , provider : string){
const session = await auth();
console.log(session);
const userId = session?.user?.id ;
const token = Math.random().toString();
if(!userId) {
    return {
        msg : "User not Logged in"
    }
}
 await prisma.onRampTransaction.create({
    data:{
        amount : amount,
        provider : provider,
        status :"Processing",
        startTime : new Date(),
        userId : userId,
        token 

    }
})

}