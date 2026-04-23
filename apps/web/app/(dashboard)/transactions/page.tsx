import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getTransactions } from "@/data/user";
import { auth } from "@/auth";

export default async function TransactionsPage() {
    const session = await auth();
    const userId = session.user.id;
    //console.log(userId);
    const transactions = await getTransactions(userId);
    //console.log(transactions)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>To / From</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-medium">{tx.label}</TableCell>

                <TableCell>
                  <Badge variant={tx.type === "CREDIT" ? "default" : "secondary"}>
                    {tx.type}
                  </Badge>
                </TableCell>

                <TableCell
                  className={
                    tx.type === "CREDIT" ? "text-green-600" : "text-red-600"
                  }
                >
                  ₹{(tx.amount / 100).toFixed(2)}
                </TableCell>

                <TableCell>
                  <Badge
                    variant={tx.status === "success" ? "default" : "destructive"}
                  >
                    {tx.status}
                  </Badge>
                </TableCell>

                <TableCell>{new Date(tx.time).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
