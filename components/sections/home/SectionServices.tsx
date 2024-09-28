import React from "react";

import BoxProject from "@/components/boxs/BoxProject";

const services = [
  {
    title: "eCommerce Website Development",
    img: "https://images.squarespace-cdn.com/content/v1/63622c27c2d35d6fc2b3ee8b/95f35e35-4f92-42d4-82cb-f657eab18f6d/2.png?format=1500w",
    collapses: [
      { title: "Full-stack eCommerce development", content: "" },
      { title: "Website support and maintainance", content: "" },
    ],
  },
  {
    title: "eCommerce Website Migration",
    img: "https://images.squarespace-cdn.com/content/v1/63622c27c2d35d6fc2b3ee8b/551d3035-6686-4562-bb24-89dee334c84a/4.png?format=1500w",
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
    img: "https://images.squarespace-cdn.com/content/v1/63622c27c2d35d6fc2b3ee8b/f18e4e1e-cfea-423a-a629-8dad098286ca/3.png?format=1500w",
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
    img: "https://images.squarespace-cdn.com/content/v1/63622c27c2d35d6fc2b3ee8b/88250e96-d7fc-423b-b9c1-fac2fa69c553/ERP+Consulting+services+icon.png?format=1500w",
    collapses: [
      {
        title:
          "Our ERP Experts assist your company as it moves through the various phases of implementing an Enterprise Resource Planning (ERP) system",
        content:
          "from setup to testing and training to the cutover stage, as you embark on your technological transformation path..",
      },
    ],
  },
  {
    title: "eCommerce Website Integration",
    img: "https://images.squarespace-cdn.com/content/v1/63622c27c2d35d6fc2b3ee8b/1690345509703-I6VV0XSY1B0TEAOF0XNH/Variux+Data+Management+Services.png?format=1500w",
    collapses: [
      {
        title: "Make you data visible, reliable, secured, and scalable",
        content:
          "We can help your business manage data, which is a vital first step toward implementing efficient data analysis at scale. Work with us to uncover essential insights that drive you to win your customers and improve your bottom line.",
      },
      {
        title: "Manipulate a variety of data types",
        content: "such as ERP, CRM, POS, Accounting, and Marketplace systems.",
      },
    ],
  },
];

function SectionServices() {
  return (
    <div className="bg-[#ffffff]  text-center xl:py-[142px] md:py-16 py-10 xl:px-28 md:px-12 px-6 snap-start">
      <h1 className="xl:text-[44px] md:text-[32px] text-[24px] text-black font-medium mb-12">
        Our Services
      </h1>
      <div className="grid md:grid-cols-3 xl:gap-[120px] gap-10">
        {services.map((service, index) => (
          <BoxProject key={index} project={service} />
        ))}
      </div>
    </div>
  );
}

export default SectionServices;
