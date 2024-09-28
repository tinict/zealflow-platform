"use client";

import React, { useState } from "react";

const datas = [
  {
    image: "https://codelearn.io/images/index/he-thong-hoc-code-manh-me.png",
    icon: "https://codelearn.io/images/index/icon-code.png",
    title: "Hệ thống mạnh mẽ, hiện đại",
    bg_color: "bg-[#f4ebeb]",
  },
  {
    image: "https://codelearn.io/images/index/noi-dung-bai-hoc-de-hieu.png",
    icon: "https://codelearn.io/images/index/icon-hoc.png",
    title: "Nội dung dễ hiểu, chi tiết",
    bg_color: "bg-[#f1f8ec]",
  },
  {
    image: "https://codelearn.io/images/index/su-kien-lap-trinh.png",
    icon: "https://codelearn.io/images/index/icon-chung-nhan.png",
    title: "Sự kiện hấp dẫn, thu hút",
    bg_color: "bg-[#f8f4eb]",
  },
  {
    image: "https://codelearn.io/images/index/cong-dong-lap-trinh.png",
    icon: "https://codelearn.io/images/index/icon-cong-dong.png",
    title: "Cộng đồng đông đảo, năng động",
    bg_color: "bg-[#ededf8]",
  },
  {
    image: "https://codelearn.io/images/index/doi-ngu-ho-tro-codelearn.png",
    icon: "https://codelearn.io/images/index/icon-doi-ngu-codelearn.png",
    title: "Đội ngũ nhiệt tình, có chuyên môn",
    bg_color: "bg-[#f4e8ef]",
  },
];

function SectionProducts() {
  const [selected, setSelected] = useState({ index: 0, data: datas[0] });

  return (
    <section
      className={`${selected.data.bg_color} text-center xl:py-[142px] md:py-16 py-10 xl:px-28 md:px-12 px-6 snap-start`}
    >
      <h1 className="xl:text-[44px] md:text-[32px] text-[24px] text-black font-medium mb-12">
        Trực tiếp Ưu điểm vượt trội
      </h1>
      <div className="md:flex items-center gap-10">
        <div className="flex-1">
          <img alt="intro" src={selected.data.image} />
        </div>
        <div>
          {datas.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 py-4 px-6 rounded-xl transition-all my-4 cursor-pointer hover:bg-white
                ${Number(selected.index) === index && "bg-white"}`}
              onClick={() => setSelected({ index: index, data: datas[index] })}
            >
              <img alt="icon" src={item.icon} />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SectionProducts;
