"use client";

// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s - ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="py-[16px]">
        <section>
          <h1 className="font-lexend text-[24px] leading-[36px] font-semibold text-[#171A1F]">
            Profile Details
          </h1>
        </section>
        <section>{children}</section>
      </div>
    </>
  );
}
