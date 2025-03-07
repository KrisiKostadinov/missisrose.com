import Navbar from "@/app/_components/navbar";
import { getAuthSessionData } from "@/lib/auth";
import SubNavbar from "@/app/_components/sub-navbar";

export default async function Header() {
  const session = await getAuthSessionData();
  return (
    <header>
      <Navbar session={session} />
      <SubNavbar />
    </header>
  );
}
