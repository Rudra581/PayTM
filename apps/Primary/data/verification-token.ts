import { prisma, Prisma } from "@repo/db";

export const getVerificationTokenByEmail = async(email :string)=>{
try{
const verificationToken = await prisma.verificationToken.findFirst({
    where :{
        email : email
    }
})
return verificationToken
}
catch(e){
console.log(e);
}

}
export const getVerificationTokenByToken = async(token : string)=>{

    try{
       const verificationtoken =  prisma.verificationToken.findFirst({
            where : {
                token : token
            }
        })
return verificationtoken;
    }
    catch(e){
        console.log(e);
    }
}