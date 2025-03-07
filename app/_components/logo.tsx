import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      className="outline-none border-4 border-white focus:border-gray-200"
      href={"/"}
    >
      <Image
        src={"/logo.svg"}
        alt={process.env.NEXT_PUBLIC_APP_NAME as string}
        width={200}
        height={60}
        loading="lazy"
        className="py-2 px-3"
      />
    </Link>
  );
}