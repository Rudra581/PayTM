
import { redirect } from 'next/navigation'
import { auth } from "../auth";

export default async function Page() {
  const session = await auth();
  console.log(session)
  if (session?.user) {
    redirect('/dashboard')
  } else {
    redirect('/register')
  }
  
}