"use client";
import { useDroppable } from "@dnd-kit/core";
import { Env, useBuilder } from "@fibr/providers";
import { classNames } from "@rafty/ui";
import { type HTMLAttributes } from "react";

export type Settings = HTMLAttributes<HTMLDivElement>;

export function Settings({ className, children, ...props }: Settings) {
  const { setNodeRef } = useDroppable({ id: "settings" });
  const isProduction = useBuilder(
    (state) => state.env.current === Env.PRODUCTION,
  );

  if (isProduction) return;

  return (
    <div
      {...props}
      className={classNames(
        "border-secondary-200 dark:border-secondary-800 dark:bg-secondary-950 absolute right-0 top-0 h-full w-96 border-l bg-white p-3",
        className,
      )}
      ref={setNodeRef}
    >
      <h4 className="font-medium">Settings</h4>
      <hr className="dark:border-secondary-700" />
      {children}
    </div>
  );
}
