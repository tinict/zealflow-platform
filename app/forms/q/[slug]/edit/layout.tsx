"use client";

import { HeaderDynamicForm } from "@/app/forms/header-dynamic-form";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="bg-[rgb(255,255,255)] flex flex-col justify-center w-full">
        <HeaderDynamicForm />
        <div className="flex w-full flex-col mt-4">
          <Tabs aria-label="Options" radius="none">
            <Tab key="photos" title="Questions">
              <Card radius="none" shadow="none">
                <CardBody className="p-0">
                  <section className="grid grid-cols-12">{children}</section>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="music" title="Dashboard">
              <Card>
                <CardBody>Feature under development</CardBody>
              </Card>
            </Tab>
            <Tab key="videos" title="Settings">
              <Card>
                <CardBody>Feature under development</CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </section>
    </>
  );
}
