import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { getAllUser, getBalanceByuserid } from "@/data/user"
import { getTransactions } from "@/data/user";
import {auth} from  "../../../auth"
import ReqMoneyDiaglog from "@/components/Request"
// const users = [
//   { id: 1, name: "Rahul" },
//   { id: 2, name: "Aditi" },
//   { id: 3, name: "Mohit" },
//   { id: 4, name: "Neha" },
//   { id: 5, name: "Kunal" },
  
// ]

export default async function DashboardPage() {
const users = await getAllUser();
//console.log(users);
const currenLoggeduser = await auth();
//console.log(currenLoggeduser);
const balance = await getBalanceByuserid(currenLoggeduser.user.id); 
//console.log(balance?.amount)
const transactions = await getTransactions(currenLoggeduser.user.id);
const thismonth = new Date().getMonth();
const final = transactions.filter(function(res){
if(res.time.getMonth() == thismonth){
  return true;
}
})
let sum = 0;
for(let i = 0 ; i < final.length ;i++){
if(final[i]?.type==="CREDIT" && final[i]?.status === "success") sum+= ((final[i]?.amount || 0)/100);
else if (final[i]?.type==="DEBIT" && final[i]?.status === "success") sum-= ((final[i]?.amount || 0)/100)
}


  return (
    <div className="flex flex-col gap-6">

      {/* Top 3 Cards */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Link href={"/transactions"}>
      
        <Card>       
          <CardHeader>
            <CardTitle>Wallet Balance</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
           ₹{((balance?.amount ?? 0) / 100)}
          </CardContent>
          
        </Card>
  </Link>

  <Link href={"/transactions"}>
        <Card>
          <CardHeader>
            <CardTitle>This Month</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {sum > 0 ? `₹${sum}` : `-₹${(-1)*sum}`}
          </CardContent>
        </Card>
</Link>
        <Card>
          <CardHeader>
            <CardTitle>Pending</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            ₹0 Due
          </CardContent>
        </Card>
      </div>

      {/* People List */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>People</CardTitle>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {
              users?.filter((user) => user.id !== currenLoggeduser.user.id)
              .map((user) => (

                <div
                  key={user.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{user.name?.[0] }</AvatarFallback>
                    </Avatar>
                    <p className="font-medium">{user.name}</p>
                  </div>

                  <div className="flex gap-2">
              

                      <Link href={`/p2p?to=${user.email}`}>
                        <Button size="sm">Pay</Button>
                      </Link>
                  <ReqMoneyDiaglog toUserId={user.id} />
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

    </div>
  )
}
