import { Metadata } from "next";

import PageWrapper from "@/app/dashboard/_components/page-wrapper";
import PageHeading from "@/app/dashboard/_components/page-heading";
import SavePopover from "@/app/dashboard/categories/_components/popover";

export const metadata: Metadata = {
  title: `Категории - ${process.env.NEXT_PUBLIC_APP_NAME as string}`,
};

export default function CategoriesPage() {
  return (
    <PageWrapper>
      <PageHeading
        title="Категории"
        description="Управление на състоянието на категориите на магазина."
        level={1}
      >
        <SavePopover />
      </PageHeading>
    </PageWrapper>
  );
}
