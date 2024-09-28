"use client";

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import { Button } from "@nextui-org/button";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import UserManager from "@/components/tables/listUser";
import { getAllProfile } from "@/common/api/user/profiles.get";

export default function Home() {
  const [userListProfile, setUserListProfile] = useState<object | null>({});

  const fetchUserProfilesData = async (page: number) => {
    try {
      const profiles = await getAllProfile({
        offset: (page - 1) * 10,
        limit: 10,
      });

      if (profiles) {
        console.log(profiles);
        setUserListProfile(profiles?.props);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <UserListComponent
        fetchUserProfilesData={fetchUserProfilesData}
        userListProfile={userListProfile}
      />
    </Suspense>
  );
}

function UserListComponent({ ...props }) {
  const { fetchUserProfilesData, userListProfile } = props;
  const searchParams = useSearchParams();
  const page: number = Number(searchParams.get("p")) || 1;

  useEffect(() => {
    fetchUserProfilesData(page);
  }, [page]);

  return (
    <section className="flex flex-col gap-4">
      <Breadcrumbs>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>List User</BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">User List</h1>
        <Button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200">
          Add User
        </Button>
      </div>
      <UserManager listProfile={userListProfile} />
    </section>
  );
}
