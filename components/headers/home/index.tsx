"use client";

import { faBell, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { Avatar, Button, User } from "@nextui-org/react";
import Link from "next/link";
import NextLink from "next/link";
import { useEffect, useState } from "react";

import { Logo } from "@/components/icons";

const menuItemsAuthTrue = [
  <p onClick={() => console.log(1)}>Home</p>,
  "Profile",
  "Setting",
];

const menuItemsAuthFalse = ["Create", "Login"];

export const HeaderHome = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<any>([]);

  useEffect(() => {
    if (isAuth) setMenuItems([...menuItemsAuthTrue]);
    else setMenuItems([...menuItemsAuthFalse]);
  }, [isAuth]);

  return (
    <NextUINavbar
      className="bg-white grid grid-cols-1"
      maxWidth="full"
      position="sticky"
    >
      <NavbarContent className="flex justify-between items-center w-full">
        <NavbarBrand as="li" className="flex items-center gap-3">
          <NextLink className="flex items-center gap-1" href="/">
            <Logo className="text-[#2c31cf]" />
            <p className="font-bold text-inherit text-[#2c31cf]">ZealFlow.io</p>
          </NextLink>
        </NavbarBrand>

        {
          isAuth ? (
            <NavbarContent className="hidden sm:flex gap-4 justify-center">
              <NavbarItem>
                <Link className="font-manrope text-[14px]" href="/">
                  Home
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link className="font-manrope text-[14px]" href="/profiles">
                  List Profile
                </Link>
              </NavbarItem>
            </NavbarContent>
          ) : (
            <NavbarContent className="hidden sm:flex gap-6 justify-center">
              <NavbarItem>
                <Link className="font-manrope text-[14px] hover:text-blue-700 focus:text-blue-700 active:text-blue-700" href="/">
                  Home
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Dropdown>
                  <DropdownTrigger>
                    <Link className="font-manrope text-[14px] hover:text-blue-700 focus:text-blue-700 active:text-blue-700" href="#">
                      Services
                    </Link>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Submenu">
                    <DropdownItem key="sub-service-1">
                      <Link className="font-manrope text-[14px] hover:text-blue-700 focus:text-blue-700 active:text-blue-700" href="/forms  ">
                        Dynamic Form
                      </Link>
                    </DropdownItem>
                    <DropdownItem key="sub-service-2">Popup builder</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
              <NavbarItem>
                <Link className="font-manrope text-[14px] hover:text-blue-700 focus:text-blue-700 active:text-blue-700" href="/profiles">
                  Solutions
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link className="font-manrope text-[14px] hover:text-blue-700 focus:text-blue-700 active:text-blue-700" href="/profiles">
                  Resources
                </Link>
              </NavbarItem>
            </NavbarContent>
          )
        }

        <div className="flex items-center gap-4">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden h-[24px] w-[24px]"
          />
          <NavbarMenu>
            <NavbarItem>
              <Link className="font-manrope text-[14px] hover:text-blue-700 focus:text-blue-700 active:text-blue-700" href="/">
                Home
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Dropdown>
                <DropdownTrigger>
                  <Link className="font-manrope text-[14px] hover:text-blue-700 focus:text-blue-700 active:text-blue-700" href="#">
                    Services
                  </Link>
                </DropdownTrigger>
                <DropdownMenu aria-label="Submenu">
                  <DropdownItem key="sub-service-1">
                    <Link className="font-manrope text-[14px] hover:text-blue-700 focus:text-blue-700 active:text-blue-700" href="/forms  ">
                      Dynamic Form
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="sub-service-2">Popup builder</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
            <NavbarItem>
              <Link className="font-manrope text-[14px] hover:text-blue-700 focus:text-blue-700 active:text-blue-700" href="/profiles">
                Solutions
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link className="font-manrope text-[14px] hover:text-blue-700 focus:text-blue-700 active:text-blue-700" href="/profiles">
                Resources
              </Link>
            </NavbarItem>
          </NavbarMenu>

          {!isAuth ? (
            <div className="hidden sm:flex items-center gap-4">
              <Button className="bg-transparent text-blue-600 text-[14px] font-medium">
                + Create
              </Button>
              <Button className="bg-blue-600 text-white text-[14px] font-medium rounded-lg">
                Login
              </Button>
            </div>
          ) : (
            <NavbarContent className="hidden sm:flex gap-6 justify-center">
              <NavbarItem>
                <Link className="font-manrope text-[14px] hover:text-blue-700 focus:text-blue-700 active:text-blue-700" href="/">
                  Home
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Dropdown>
                  <DropdownTrigger>
                    <Link className="font-manrope text-[14px] hover:text-blue-700 focus:text-blue-700 active:text-blue-700" href="#">
                      Services
                    </Link>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Submenu">
                    <DropdownItem key="sub-service-1">
                      <Link className="font-manrope text-[14px] hover:text-blue-700 focus:text-blue-700 active:text-blue-700" href="/forms  ">
                        Dynamic Form
                      </Link>
                    </DropdownItem>
                    <DropdownItem key="sub-service-2">Popup builder</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
              <NavbarItem>
                <Link className="font-manrope text-[14px] hover:text-blue-700 focus:text-blue-700 active:text-blue-700" href="/profiles">
                  Solutions
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link className="font-manrope text-[14px] hover:text-blue-700 focus:text-blue-700 active:text-blue-700" href="/profiles">
                  Resources
                </Link>
              </NavbarItem>
            </NavbarContent>
          )}
        </div>
      </NavbarContent>
    </NextUINavbar>
  );
};
