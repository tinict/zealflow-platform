"use client";

import {
  SectionIntro,
  SectionProducts,
  SectionServices,
  SectionSolution,
} from "@/components/sections";

export default function Home() {
  return (
    <section>
      <section className="h-[60px] snap-start" />
      <SectionIntro />
      <SectionServices />
      <SectionProducts />
      <SectionSolution />
      <section className="snap-start" />
    </section>
  );
}
