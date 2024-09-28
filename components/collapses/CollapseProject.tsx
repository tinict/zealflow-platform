import React, { useState } from "react";
import { GoChevronDown } from "react-icons/go";

function CollapseProject({ project }: { project: any }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-2 border-t border-b font-light overflow-hidden">
      <div
        className="flex items-center justify-between cursor-pointer gap-4"
        onClick={() => setOpen(!open)}
      >
        <p className="flex-1">{project.title}</p>
        <GoChevronDown className={`${open && "rotate-180"} transition-all`} />
      </div>

      <div className={`${open ? "mb-10" : "h-0"} transition-all`}>
        <p className="pt-4">{project.content}</p>
      </div>
    </div>
  );
}

export default CollapseProject;
