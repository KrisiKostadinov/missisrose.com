import { ReactNode } from "react";

import DashboardNavbar from "@/app/dashboard/_components/navbar";

type Props = {
  children: ReactNode;
};

export default function PageWrapper({ children }: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      <DashboardNavbar />
      {children}
    </div>
  );
}
