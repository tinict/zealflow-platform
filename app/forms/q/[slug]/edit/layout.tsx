"use client";

import { HeaderDynamicForm } from "@/app/forms/header-dynamic-form";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="bg-[rgb(255,255,255)] flex flex-col justify-center w-full">
        <HeaderDynamicForm />
        <div className="flex w-full flex-col mt-4">
          <section className="grid grid-cols-12">{children}</section>
        </div>
      </section>
    </>
  );
}
