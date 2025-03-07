import Navbar from "@/app/_components/navbar";
import { getAuthSessionData } from "@/lib/auth";

export default async function Header() {
  const session = await getAuthSessionData();
  return (
    <header>
      <Navbar session={session} />
    </header>
  );
}
