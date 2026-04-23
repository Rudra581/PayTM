"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {createRequest} from "../actions/createReq"

export default function ReqMoneyDiaglog({toUserId} :{toUserId : string}){
    const [amount ,setAmount] = useState("");
    const [note , setNote] = useState("");
    const [loading , setLoading] = useState(false)
    async function handleSubmit() {
        setLoading(true)
        await createRequest(toUserId , Number(amount) , note);
            setLoading(false)
         setAmount("")
          setNote("")
        alert("Request sent")
    }
    return (
       <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">Request</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Money</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Textarea
            placeholder="For what?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Sending..." : "Send Request"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )

}