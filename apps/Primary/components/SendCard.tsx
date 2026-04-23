"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Center } from "@repo/ui/Center"
import { TextInput } from "@repo/ui/TextInput"

import {
  Dialog,
  DialogContent,
  DialogClose
} from "@/components/ui/dialog"
import { Loader2, CheckCircle } from "lucide-react"

export function SendCard() {
  const [email, setEmail] = useState("")
  const [amount, setAmount] = useState("")
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

  const searchParams = useSearchParams()
  const to = searchParams.get("to")
  const Amount = (searchParams.get("amount"))
  console.log(Amount);
  const router = useRouter()

  async function handleSend() {
    setOpen(true)
    setStatus("loading")

    const res = await fetch("/api/p2p", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: to ?? email,
        amount: Number(Amount ?? amount),
      }),
    })

    const data = await res.json()

    if (data.message === "Success") {
      setStatus("success")
    }
  }

  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <TextInput
              value={to ?? email}
              disabled={!!to}
              placeholder="Email"
              label="Email"
              onChange={(v) => !to && setEmail(v)}
            />

            <TextInput
            value={Amount ?? amount}
            disabled ={!!Amount}
              placeholder="Amount"
              label="Amount"
              onChange={(v) => setAmount(v)}
            />

            <div className="pt-4 flex justify-center">
              <Button onClick={handleSend}>Send</Button>
            </div>
          </div>
        </Card>
      </Center>

      <Dialog open={open} onOpenChange={setOpen}>
       
        <DialogContent className="text-center">
           
          {status === "loading" && (
            <>
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-blue-600" />
              <h2 className="text-lg font-semibold mt-4">
                Processing payment…
              </h2>
              <p className="text-sm text-muted-foreground">
                Please wait while we transfer the money
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
              <h2 className="text-lg font-semibold mt-4">
                Payment Successful
              </h2>
              <p className="text-sm text-muted-foreground">
                Money sent successfully
              </p>

              <Button  onClick={() => router.push("/transactions")}>
                Continue
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
