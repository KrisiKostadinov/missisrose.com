import { Metadata } from "next";

import PageWrapper from "@/app/dashboard/_components/page-wrapper";
import PageHeading from "@/app/dashboard/_components/page-heading";

export const metadata: Metadata = {
  title: `Табло - ${process.env.NEXT_PUBLIC_APP_NAME as string}`,
};

export default function DashboardPage() {
  return (
    <PageWrapper>
      <PageHeading
        title="Табло"
        description="Управление на състоянието на магазина."
        level={1}
      />
      Тук са децата...
    </PageWrapper>
  );
}
