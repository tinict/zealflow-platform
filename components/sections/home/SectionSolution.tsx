import React from "react";

import BoxProject from "@/components/boxs/BoxProject";

const solutions = [
  {
    title: "eCommerce Website Development",
    img: "https://images.squarespace-cdn.com/content/v1/63622c27c2d35d6fc2b3ee8b/1677504701586-S8WS2E5CFG969S0AM3F9/Why+you+may+need+Okta+SSO+for+Acumatica.png?format=1500w",
    collapses: [
      { title: "Full-stack eCommerce development", content: "" },
      { title: "Website support and maintainance", content: "" },
    ],
  },
  {
    title: "eCommerce Website Migration",
    img: "https://images.squarespace-cdn.com/content/v1/63622c27c2d35d6fc2b3ee8b/1678787432435-QUPPBGHMNLJVSKCN1TYT/Variux+-+New+website+design+-+Prepared+by+Iris+%281%29.png?format=500w",
    collapses: [
      {
        title: "Migrating your Magento website to other platforms",
        content: "such as BigCommerce, Shopify, Shopify Plus, etc.",
      },
      { title: "Transferring your data, content, and system.", content: "" },
    ],
  },
  {
    title: "eCommerce Website Integration",
    img: "https://images.squarespace-cdn.com/content/v1/63622c27c2d35d6fc2b3ee8b/1697884637853-1MEDZK3J418RVU5CAIJY/Variuxwarranty+mangement+for+magento+2+-+cover.png?format=1500w",
    collapses: [
      {
        title:
          "Connecting data between your eCommerce website and other diverse system",
        content: "such as ERP, CRM, POS, Accounting, and Marketplace systems.",
      },
    ],
  },
  {
    title: "eCommerce Website Integration",
    img: "https://images.squarespace-cdn.com/content/v1/63622c27c2d35d6fc2b3ee8b/1678787668535-898L9GJ3CGN95Q3N4AOU/Okta+for+Acu+-+Logo.png?format=1500w",
    collapses: [
      {
        title:
          "Our ERP Experts assist your company as it moves through the various phases of implementing an Enterprise Resource Planning (ERP) system",
        content:
          "from setup to testing and training to the cutover stage, as you embark on your technological transformation path..",
      },
    ],
  },
];

function SectionSolution() {
  return (
    <div className="bg-[#F5F5F4] text-center xl:py-[142px] md:py-16 py-10 xl:px-28 md:px-12 px-6 snap-start">
      <h1 className="xl:text-[44px] md:text-[32px] text-[24px] text-black font-medium mb-12">
        Our Solution
      </h1>
      <div className="grid md:grid-cols-3 xl:gap-[120px] gap-10">
        {solutions.map((solution, index) => (
          <BoxProject key={index} project={solution} />
        ))}
      </div>
    </div>
  );
}

export default SectionSolution;
