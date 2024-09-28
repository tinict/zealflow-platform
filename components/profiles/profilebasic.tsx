"use client";

import React from "react";
import { Card, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import AvatarBordered from "../avatars/bordered";

import {
  formatDate,
  formatFullName,
  formatGender,
  formatPhone,
} from "@/helpers/validate";

const ProfileBasic = ({ ...props }) => {
  const { slug } = props;
  const { repo } = props.profile;
  const router = useRouter();

  const handleEditProfile = () => {
    router.push(`${slug}/about_overview`);
  };

  return (
    <div>
      <Card className="w-full p-5 text-center shadow-md rounded-lg">
        <div className="flex justify-center mb-2.5">
          <AvatarBordered
            classAttribute={{
              style: "w-36 h-36 rounded-full",
            }}
            urlPicture={repo?.picture}
          />
        </div>
        <div className="flex justify-center mb-2.5">
          <Button color="primary" onClick={handleEditProfile}>
            Update Profile
          </Button>
        </div>
        <div className="px-4 py-6">
          <div className="border-t border-gray-200 py-4">
            <div className="flex justify-between py-2">
              <span className="text-sm text-gray-500">FullName:</span>
              <span>{formatFullName(repo?.firstname, repo?.lastname)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-gray-500">Gender:</span>
              <span>{formatGender(repo?.gender)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-gray-500">Date of Birth:</span>
              <span>{formatDate(repo?.dob)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-gray-500">Phone:</span>
              <span>{formatPhone(repo?.phone)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-gray-500">Location:</span>
              <span>Test</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-gray-500">Email:</span>
              <span>{repo?.email}</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 py-4">
          <div className="py-2">
            <span className="text-sm text-gray-500">Bio</span>
            <p>{repo?.bio}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileBasic;
