import React, { JSX, ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children?: ReactNode;
};

export default function PageHeading({
  title,
  description,
  level = 1,
  children,
}: Props) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <div className="w-full p-5 border-b shadow flex max-sm:flex-col items-center justify-between">
      <div>
        <HeadingTag className="text-2xl">{title}</HeadingTag>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  );
}