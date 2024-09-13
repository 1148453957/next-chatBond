import { getSessionData } from "@/app/login/action";
import Client from "./pageClient";

export default async function indexPage({ searchParams }: any) {
  const session = await getSessionData();

  return <Client session={session} searchParams={searchParams} />;
}
