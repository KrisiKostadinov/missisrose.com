import { prisma } from "@/db/prisma";
import NestedCategories from "@/app/demo/nested-categories";
import { Separator } from "@/components/ui/separator";

export default async function CategoryPage() {
  const categories = await prisma.category.findMany({
    where: {
      parentId: null,
    },
    orderBy: { createdAt: "desc" },
    include: {
      children: {
        include: {
          children: true,
        }
      }
    },
  });  

  return (
    <div className="w-sm h-screen bg-gray-50 border">
      <div className="text-xl my-4 px-5">Категории</div>
      <Separator />
      <NestedCategories categories={categories} />
    </div>
  );
}