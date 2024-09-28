"use client";

import React, { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function PaginationData() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const handleSelectPage = (page: number) => {
    router.push(`/profiles?p=${page}`);
  };

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  return (
    <Pagination
      isCompact
      showControls
      initialPage={1}
      page={currentPage}
      total={10}
      onChange={(page) => handleSelectPage(page)}
    />
  );
}
