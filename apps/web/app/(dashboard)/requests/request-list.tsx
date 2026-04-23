"use client"

import { Button } from "@/components/ui/button"
import { declineReq } from "@/actions/createReq"
import { useRouter } from "next/navigation"

export default function RequestList({ requests }: any) {
  const router = useRouter()

  if (!requests.length) {
    return <p className="text-muted-foreground">No pending requests </p>
  }

  return (
    <div className="space-y-4">
      {requests.map((r: any) => (
        <div
          key={r.id}
          className="flex items-center justify-between rounded-lg border p-4"
        >
          <div>
            <p className="font-medium">
              {r.fromUser.name || r.fromUser.email}
            </p>
            <p className="text-sm text-muted-foreground">
              Requested ₹{r.amount / 100} {r.note && `• ${r.note}`}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() =>
                router.push(
                  `/p2p?to=${r.fromUser.email}&amount=${r.amount / 100}&requestId=${r.id}`
                )
              }
            >
              Pay
            </Button>

            <Button
              variant="outline"
              onClick={async () => {
                await declineReq(r.id)
                router.refresh()
              }}
            >
              Decline
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
