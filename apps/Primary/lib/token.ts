import { getVerificationTokenByEmail } from '@/data/verification-token';
import { prisma } from '@repo/db';
import { v4 as uuidv4 } from 'uuid';

export const generateVerificationToken= async (email :string)=>{
    const token = uuidv4();
    const expires = new Date().getTime() + 1000*60*60*1; // 1Hour
    const existingtoken = await getVerificationTokenByEmail(email);

    if (existingtoken) {
        await prisma.verificationToken.delete({
            where : {
                id: existingtoken.id
            }
        })
    }
    //create a new verification Token
    const verificationToken = await prisma.verificationToken.create({
        data:{
            email,
            token,
            expires : new Date(expires) 
        }
    })
    return verificationToken;
}