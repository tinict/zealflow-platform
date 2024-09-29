import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/react";

export const DropDownQuestion = () => {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button className="h-[48px] flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <svg
                        className="mr-2 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" fill="currentColor" r="6" />
                    </svg>
                    <span>Radio-choice</span>
                    <svg
                        aria-hidden="true"
                        className="-mr-1 ml-2 h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clipRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.92l3.71-3.7a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
                            fillRule="evenodd"
                        />
                    </svg>
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem key="Radio-choice">Radio-choice</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};