import {prisma} from "@repo/db";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";

import { auth } from "../../../auth";


async function getBalance() {
    const session = await auth();
    if (!session?.user?.id) {
        return {
            amount: 0,
            locked: 0,
            error: "Unauthorized" 
        };
    }
    else{
    const balance = await prisma.balance.findUnique({
        where: {
            userId: (session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}
}

async function getOnRampTransactions() {
    const session = await auth();
     if (!session?.user?.id) {
       return [];
    }

    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: (session?.user?.id)
        },
        orderBy: {
    startTime: "desc", 
  },
  take: 5,    
    });
    txns.sort()
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return <div className="w-full max-w-7xl">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoney />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}