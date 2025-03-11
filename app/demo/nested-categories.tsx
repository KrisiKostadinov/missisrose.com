"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, FileIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type Category = {
  id: number;
  name: string;
  children?: Category[];
};

type CategoryProps = {
  categories: Category[];
  level?: number;
};

const NestedCategories: React.FC<CategoryProps> = ({
  categories,
  level = 0,
}) => {
  const [openCategories, setOpenCategories] = useState<number[]>([]);

  useEffect(() => {
    const savedState = localStorage.getItem("openCategories");
    if (savedState) {
      setOpenCategories(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("openCategories", JSON.stringify(openCategories));
  }, [openCategories]);

  const toggleCategory = (id: number) => {
    setOpenCategories((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    );
  };

  return (
    <div className={cn("", level > 0 && "pl-5")}>
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          level={level}
          isOpen={openCategories.includes(category.id)}
          toggleCategory={toggleCategory}
        />
      ))}
    </div>
  );
};

const CategoryItem: React.FC<{
  category: Category;
  level: number;
  isOpen: boolean;
  toggleCategory: (id: number) => void;
}> = ({ category, level, isOpen, toggleCategory }) => {
  return (
    <div>
      <div
        className={cn(
          "relative flex items-center gap-1 border-b border-l hover:text-white hover:bg-primary py-1 px-2"
        )}
        onClick={() => {
          category.children?.length && toggleCategory(category.id);
        }}
      >
        {category.children ? (
          <div className="p-0.5 rounded">
            {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </div>
        ) : (
          <div className="p-0.5 rounded">
            <FileIcon size={18} />
          </div>
        )}
        <div className="w-full cursor-pointer">{category.name}</div>
      </div>

      {isOpen && category.children && (
        <NestedCategories categories={category.children} level={level + 1} />
      )}
    </div>
  );
};

export default NestedCategories;
