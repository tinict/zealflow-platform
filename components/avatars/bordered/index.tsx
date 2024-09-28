"use client";

import React, { useMemo } from "react";
import { Avatar } from "@nextui-org/react";

export default function AvatarBordered({ ...props }) {
  const { classAttribute } = props;
  const { urlPicture } = props;

  const pictureUrl = useMemo(() => {
    return urlPicture || "https://via.placeholder.com/150";
  }, [urlPicture]);

  return (
    <Avatar isBordered className={classAttribute.style} src={pictureUrl} />
  );
}
