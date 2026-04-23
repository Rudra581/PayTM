import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from "bcrypt"
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({adapter});

async function main() {
    const alice = await prisma.user.upsert({
    where: { number: '9999999999' },
    update: {},
    create: {
      number: '9999999999',
      password: await bcrypt.hash("alice" ,10),
      name: 'alice',
    Balance:{
        create:{
            amount :20000,
            locked :0
        }
    },

      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "tokrn-1",
          provider: "HDFC Bank",
        },
      },
    },
    })
    const bob = await prisma.user.upsert({
    where: { number: '11111111' },
    update: {},
    create: {
      number: '11111111',
     password: await bcrypt.hash("bob" ,10),
      name: 'bob',
        Balance:{
        create:{
            amount: 10000,
            locked :0
            },
        },

      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 10000,
          token: "token-2",
          provider: "HDFC Bank",
        },
      },
    },
  })
   console.log({ alice, bob })

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  
  
  
  
  
  
  
