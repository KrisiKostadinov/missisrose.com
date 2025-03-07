import React, { JSX } from "react";

type Props = {
  title: string;
  description?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};

export default function PageHeading({ title, description, level = 1 }: Props) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <div className="container mx-auto p-5 bg-gray-100">
      <HeadingTag className="text-2xl">{title}</HeadingTag>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
}
