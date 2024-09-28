import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr";

export default function DisabledKey({ ...props }) {
  const { component } = props;
  const { data, error } = useSWR("/api/data-edit-profile");
  const [isEditing, setIsEditing] = useState(false);

  const dataEditProfile = useSWR("/api/data-edit-profile");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="w-8 h-8 flex items-center justify-center text-gray-700 bg-gray-200 hover:text-gray-900 focus:outline-none rounded-full shadow">
          <FontAwesomeIcon icon={faEllipsis} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="edit" onClick={handleEditClick}>
          Edit
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
