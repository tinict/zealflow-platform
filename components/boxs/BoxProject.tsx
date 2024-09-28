import React from "react";

import CollapseProject from "../collapses/CollapseProject";

function BoxProject({ project }: { project: any }) {
  return (
    <div className="w-full flex flex-col text-left">
      <img alt="img" className="rounded-2xl" src={project.img} />
      <h2 className="text-[#008c95] text-[24px] underline underline-offset-4 float-start my-4">
        {project.title}
      </h2>
      <div className="">
        {project.collapses.map((collapse: any, index: number) => (
          <CollapseProject key={index} project={collapse} />
        ))}
      </div>
    </div>
  );
}

export default BoxProject;
