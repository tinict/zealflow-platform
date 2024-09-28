"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Listbox,
  ListboxItem,
  Modal,
  ModalContent,
  useDisclosure,
  User,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import { getUserProfile } from "@/common/api/user/profile.get";
import {
  formatDate,
  formatFullName,
  formatGender,
  formatPhone,
} from "@/helpers/validate";
import EditProfile from "@/components/edit_profile";

type GetUserProfile = {
  repo: {
    id: string;
    firstname: string;
    lastname: string;
    username: string;
    gender: string;
    dob: string;
    phone: string;
    email: string;
    bio: string;
    picture: string;
  };
};

interface ProfileProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: ProfileProps) {
  const [userProfile, setUserProfile] = useState<GetUserProfile | {}>({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [profile, setProfile] = useState<object>({});

  /**
   * Call get profile by api getProfile, using login sso with Google
   */
  const fetchProfile = async () => {
    const profile = await getUserProfile({
      id: params.slug,
    });

    if (profile) {
      console.log(profile);
      setUserProfile(profile?.props);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleEditProfile = (user: any) => {
    onOpen();
    setProfile(user);
  };

  const handleProfileUpdate = (updatedProfile: any) => {
    setUserProfile({ repo: updatedProfile });
  };

  return (
    // <section className="flex flex-col gap-4 py-8 md:py-10">
    //     <ProfileBasic profile={userProfile} slug={params.slug} />
    // </section>
    <>
      <section className="py-[33px]">
        <User
          as="button"
          avatarProps={{
            size: "lg",
            isBordered: false,
            src: userProfile?.repo?.picture || "",
          }}
          className="transition-transform"
          description={formatFullName(
            userProfile?.repo?.lastname,
            userProfile?.repo?.firstname,
          )}
          name={userProfile?.repo?.username}
        />
      </section>
      <section className="flex justify-between rounded-none">
        <div className="w-[950px] bg-[#F8F9FAFF]">
          <div className="h-[76px] flex items-center py-[27px] px-[24px]">
            <FontAwesomeIcon
              className="color-[#171A1FFF] w-[24px] h-[24px]"
              icon={faAddressCard}
            />
            <h2 className="font-[Lexend] text-[20px] leading-[30px] font-bold text-[#171A1FFF] p-[12px]">
              General Information
            </h2>
          </div>
          <div className="border-t border-gray-300" />
          <div className="p-[24px]">
            <div className="flex items-center justify-between mb-[17px]">
              <h1 className="font-[Lexend] text-[18px] leading-[28px] font-semibold text-[#171A1FFF]">
                Personal Information
              </h1>
              <Button
                className="bg-[#F8F9FAFF] hover:bg-[#DEE1E6FF]"
                onClick={() => handleEditProfile(userProfile?.repo)}
              >
                <FontAwesomeIcon
                  className="color-[#171A1FFF]"
                  icon={faPenToSquare}
                />
                <span className="text-[#171A1FFF]">Edit</span>
              </Button>
            </div>
            <div className="flex">
              <div className="flex w-1/4 mr-32">
                <div className="w-full">
                  <ul className="font-[Lexend] text-[14px] text-[#686583] w-full">
                    <li className="flex items-center justify-between h-[24px]">
                      <span className="w-1/2">Phone</span>
                      <span className="w-[100px] text-left">
                        {formatPhone(userProfile?.repo?.phone)}
                      </span>
                    </li>
                    <li className="flex items-center justify-between h-[24px]">
                      <span className="w-1/2">Email</span>
                      <span className="w-[100px] text-left">
                        {userProfile?.repo?.email}
                      </span>
                    </li>
                    <li className="flex items-center justify-between h-[24px]">
                      <span className="w-1/2">Birthday</span>
                      <span className="w-[100px] text-left">
                        {formatDate(userProfile?.repo?.dob)}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex w-1/4 ml-32">
                <ul className="font-[Lexend] text-[14px] text-[#686583] w-full">
                  <li className="flex items-center justify-between h-[24px]">
                    <span className="w-1/2">Gender</span>
                    <span className="w-[100px] text-left">
                      {formatGender(userProfile?.repo?.gender)}
                    </span>
                  </li>
                  <li className="flex items-center justify-between h-[24px]">
                    <span className="w-1/2">Nationality</span>
                    <span className="w-[100px] text-left">Viet Nam</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-300 my-8" />
            <div className="flex items-center justify-between mb-[17px]">
              <h1 className="font-[Lexend] text-[18px] leading-[28px] font-semibold text-[#171A1FFF]">
                Description Personal
              </h1>
              <Button
                className="bg-[#F8F9FAFF] hover:bg-[#DEE1E6FF]"
                onClick={() => handleEditProfile(userProfile?.repo)}
              >
                <FontAwesomeIcon
                  className="color-[#171A1FFF]"
                  icon={faPenToSquare}
                />
                <span className="text-[#171A1FFF]">Edit</span>
              </Button>
            </div>
            <div className="flex w-full">
              <div className="flex w-full">
                <div className="w-full">
                  <p className="font-[Lexend] text-[14px] text-[#686583] w-full">
                    {userProfile?.repo?.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[240px] h-[200px] bg-[#F8F9FA] rounded-none px-[24px] py-[32px]">
          <Listbox aria-label="Actions">
            <ListboxItem key="new">General Information</ListboxItem>
          </Listbox>
        </div>
      </section>
      <Modal
        backdrop="opaque"
        className="w-[600px]"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
        isOpen={isOpen}
        radius="lg"
        size="2xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <EditProfile data={profile} onProfileUpdate={handleProfileUpdate} />
        </ModalContent>
      </Modal>
    </>
  );
}
