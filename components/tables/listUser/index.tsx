"use client";

import React, { useCallback, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  ModalContent,
  Modal,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";

import { EyeIcon } from "../../icons/EyeIcon";
import { EditIcon } from "../../icons/EditIcon";

import Search from "@/components/search";
import {
  formatDate,
  formatFullName,
  formatGender,
  formatPhone,
} from "@/helpers/validate";
import PaginationData from "@/components/pagination";
import EditProfile from "@/components/edit_profile";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
import { deleteUserProfile } from "@/common/api/user/profile.delete";
// import { getAllProfile } from "@/common/api/user/getAllProfile";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "PHONE", uid: "phone" },
  { name: "DOB", uid: "dob" },
  { name: "GENDER", uid: "gender" },
  { name: "ADDRESS", uid: "address" },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

const statusColorMap: any = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function UserManager({ ...props }) {
  const { repo } = props.listProfile;
  const userProfile = repo?.list?.data || [];
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [profile, setProfile] = useState<object>({});
  const searchParams = useSearchParams();
  const page: number = Number(searchParams.get("p")) || 1;

  const handleShowProfile = (id: string, user: any) => {
    router.push(`/profile/${id}`);
    setProfile(user);
  };

  const handleEditProfile = (user: any) => {
    onOpen();
    setProfile(user);
  };

  const handleDeleteProfile = (id: string) => {
    deleteUserProfile({
      id,
    });
  };

  // const fetchUserProfilesData = async () => {
  //     try {
  //         const profiles = await getAllProfile({
  //             offset: (page - 1) * 10,
  //             limit: 10,
  //         });
  //         if (profiles) {
  //             console.log(profiles)
  //             setProfile(profiles?.props);
  //         }
  //     } catch (error: any) {
  //         console.log(error);
  //     }
  // };

  const renderCell = useCallback(
    (user: any, columnKey: any) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: user.picture }}
              description={formatFullName(user.firstname, user.lastname)}
              name={user.email}
            >
              {user.email}
            </User>
          );
        case "phone":
          return formatPhone(user.phone);
        case "dob":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[user.dob]}
              size="sm"
              variant="flat"
            >
              {formatDate(cellValue)}
            </Chip>
          );
        case "gender":
          return formatGender(user.gender);
        case "description":
          return cellValue;
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="View Profile">
                <span className="flex text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon onClick={() => handleShowProfile(user.id, user)} />
                </span>
              </Tooltip>
              <Tooltip content="Edit">
                <span className="flex text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon onClick={() => handleEditProfile(user)} />
                </span>
              </Tooltip>
              <Tooltip content="Delete">
                <span className="flex text-lg text-default-400 cursor-pointer active:opacity-50">
                  <DeleteIcon onClick={() => handleDeleteProfile(user.id)} />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [handleShowProfile, onOpen],
  );

  return (
    <>
      <Search />
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={userProfile}>
          {(item: any) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-center items-center">
        <PaginationData />
      </div>
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
          <EditProfile data={profile} />
        </ModalContent>
      </Modal>
    </>
  );
}
