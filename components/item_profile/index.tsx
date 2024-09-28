import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";

import { updateUserProfile } from "@/common/api/user/updateProfile";

export const ItemProfile = ({ ...props }) => {
  const { label, content } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [editUser, setEditUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    setEditUser(content.profile);
  }, []);

  const handleUpdateProfile = async ({ ...props }) => {
    const { id, body } = props;

    await updateUserProfile({
      id,
      body,
    }).then(() => {
      setIsOpen(false);
      alert("Updated Successfully!");
    });
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 rounded-lg">
        <div className="flex items-center space-x-2 w-full px-4">
          {!isOpen && (
            <>
              <FontAwesomeIcon className="text-gray-700" icon={faBriefcase} />
              <span className="text-black-400 font-light">
                <p>{content.root}</p>
              </span>
            </>
          )}
          {isOpen && (
            <>
              <div className="w-full bg-white rounded-lg">
                <Input
                  className="w-full mb-4"
                  defaultValue={content.root}
                  label={`${label}`}
                  placeholder={`Enter your ${label}`}
                  type="text"
                  variant="underlined"
                  onChange={(e) =>
                    setEditUser({
                      ...content.profile,
                      [`${content.type}`]: e.target.value,
                    })
                  }
                />
                <div className="flex justify-end space-x-4">
                  <Button
                    className="bg-gray-300 text-gray-700 hover:bg-gray-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-blue-500 text-white hover:bg-blue-600"
                    onClick={() =>
                      handleUpdateProfile({
                        id: content?.profile?.id,
                        body: { ...editUser },
                      })
                    }
                  >
                    Update
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
        <div>
          <Dropdown>
            <DropdownTrigger>
              <Button className="w-8 h-8 flex items-center justify-center text-gray-700 bg-gray-200 hover:text-gray-900 focus:outline-none rounded-full shadow">
                <FontAwesomeIcon icon={faEllipsis} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="edit" onClick={() => setIsOpen(true)}>
                Edit
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};
