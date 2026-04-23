import { NextResponse } from "next/server"
import { p2pTransfer } from "../../../actions/p2pTransfer"

export async function POST(req: Request) {
  const body = await req.json()

  await p2pTransfer(body.to, body.amount)
return NextResponse.json({ message: "Success" })

}
