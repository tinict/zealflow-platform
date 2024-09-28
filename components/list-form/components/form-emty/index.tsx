import { Image } from "@nextui-org/image";

import { noForms } from "@/utils/medias";

export const FormEmty = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <Image
        alt="NextUI hero Image with delay"
        height={250}
        radius="md"
        src={noForms.src}
        width={250}
      />
      <p className="text-base">There is no forms</p>
    </div>
  );
};
