import Link from "next/link";

type Props = {
  name: string;
  href: string;
  target: "_blank" | "_parent" | "_self" | "_top";
};

export default function PageLink({ name, href, target = "_self" }: Props) {
  return (
    <Link
      className="hover:underline inline-block text-primary"
      href={href}
      target={target}
    >
      {name}
    </Link>
  );
}
