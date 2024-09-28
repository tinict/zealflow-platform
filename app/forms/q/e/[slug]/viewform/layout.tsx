"use client";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="bg-[rgb(255,255,255)] grid grid-cols-12 mt-4">
        {children}
      </section>
    </>
  );
}
