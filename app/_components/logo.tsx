import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <Image
        src={"/icons/logo.svg"}
        alt={process.env.NEXT_PUBLIC_APP_NAME as string}
        width={200}
        height={60}
        loading="lazy"
      />
    </Link>
  );
}
