
import { getMyReq } from "../../../actions/createReq"
import RequestList from "./request-list"
import { auth } from "@/auth"
export default async function RequestsPage() {
    const session = await auth();
    const userId = session?.user?.id;
  const requests = await getMyReq()
  console.log(requests);
  return <RequestList requests={requests} />
}
