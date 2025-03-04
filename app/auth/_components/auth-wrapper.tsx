import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthWrapper({ children }: Props) {
  return <section className="max-w-lg mx-auto sm:border shadow-lg rounded p-5 sm:my-10">{children}</section>;
}
