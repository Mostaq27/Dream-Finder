"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  useDisclosure,
  Avatar,
  Image,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "@nextui-org/react";
import { FaBell, FaMoon, FaSun } from "react-icons/fa";
import { usePathname } from "next/navigation";
import useContextData from "@/hooks/useContextData";
import SignOutModal from "./LogoutModal";
import ThemeSwitch from "@/app/ThemeSwitch";
import "./navbar.css"


const NextNavbar = () => {
  const pathName = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const path = usePathname();
  const [navbarSize, setNavbarSize] = useState("xl");
  const { user } = useContextData();
  

  const handleResize = useCallback(() => {
    const width = window.innerWidth;

    if (width >= 1280) {
      setNavbarSize("xl");
    } else if (width >= 1024) {
      setNavbarSize("lg");
    } else if (width >= 768) {
      setNavbarSize("md");
    } else if (width >= 640) {
      setNavbarSize("sm");
    }
  }, []);


  // side effect
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  

  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <>
      {path.includes("auth") || (
        <Navbar
          maxWidth={navbarSize}
          shouldHideOnScroll={true}
          onMenuOpenChange={setIsMenuOpen}
          className="navbarCustomDesign"
        >
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="lg:hidden"
            />
            <NavbarBrand className="hidden md:flex">
              <Link href="/">
                <Image src="/logo.png" className="hidden lg:flex" width={100}  alt="logo" />
              </Link>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="hidden lg:flex gap-4">
            <NavbarItem className="">
              <Link
                href="/"
                style={{ background: pathName === "/" &&  "linear-gradient(0deg,  transparent, #00BE6370)", borderTop: pathName === "/" && "1px solid #00BE63",borderBottom:   pathName === "/" && 0, borderRadius:  pathName === "/" && "5px"}}
                className={`text-black navLinkHover  dark:text-white border border-transparent  py-1 px-3  font-medium`}
              >
                Home
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                href="/Find-Jobs"
                className={`${pathName === "/Find-Jobs" ? "activeNavlink":""} navLinkHover text-black dark:text-white border border-transparent  py-1 px-3 rounded-md font-medium`}
              >
                All Jobs
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                href="/contact"
                className={ `${pathName === "/contact"  ? "activeNavlink" :""} text-black dark:text-white navLinkHover py-1 px-3 border border-transparent font-medium`}
              >
                Contact Us
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                href="/subscription"
                className={` ${pathName === "/subscription" && "activeNavlink"} text-black dark:text-white navLinkHover py-1 px-3  border border-transparent font-medium`}
              >
                Subscription
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                href="/upcoming-event"
                className={`${pathName === "/upcoming-event" && "activeNavlink"} text-black dark:text-white navLinkHover  border border-transparent py-1 px-3 rounded-md font-medium`}
              >
                Upcoming Event
              </Link>
            </NavbarItem>

            {/* navbar content */}
            <NavbarItem>
              <Badge content="99+" shape="circle" color="danger">
                <Button
                  radius="full"
                  isIconOnly
                  aria-label="more than 99 notifications"
                  variant="light"
                >
                  <FaBell size={24} />
                </Button>
              </Badge>
            </NavbarItem>

            <NavbarItem>
              <ThemeSwitch></ThemeSwitch>
            </NavbarItem>

            <NavbarItem>
              {user ? (
                <>
                  <Button
                    onClick={onOpen}
                    color="success"
                    variant="flat"
                    style={{borderRadius: "5px",}}
                    className="font-bold border border-primaryColor"
                  >
                    Sign out
                  </Button>
                  {user && (
                    <Avatar src={user?.photoURL} className="ml-3 " size="md" />
                  )}
                </>
              ) : (
                <Button
                  as={Link}
                  href="/auth/signin"
                  color="success"
                  variant="flat"
                  style={{borderRadius: "5px"}}
                  className="font-bold rounded border border-primaryColor"
                >
                  Sign in
                </Button>
              )}
            </NavbarItem>
          </NavbarContent>

          <NavbarContent className="lg:hidden max-w-60">
            <NavbarItem>
              <Badge content="99+" shape="circle" color="danger">
                <Button
                  radius="full"
                  isIconOnly
                  aria-label="more than 99 notifications"
                  variant="light"
                >
                  <FaBell size={24} />
                </Button>
              </Badge>
            </NavbarItem>

            <NavbarItem>
              <ThemeSwitch></ThemeSwitch>
            </NavbarItem>
            

            <NavbarItem>
              {user ? (
                <>
                  <Button
                    onClick={onOpen}
                    color="success"
                    variant="flat"
                    className="font-bold"
                  >
                    Sign out
                  </Button>
                  {user && (
                    <Avatar src={user?.photoURL} className="ml-3" size="md" />
                  )}
                </>
              ) : (
                <Button
                  as={Link}
                  href="/auth/signin"
                  color="success"
                  variant="flat"
                  className="font-bold"
                >
                  Sign in
                </Button>
              )}
            </NavbarItem>
          </NavbarContent>

          <NavbarMenu>
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link href={item.path}>{item.title}</Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>

          {/* logout modal */}
          <SignOutModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </Navbar>
      )}
    </>
  );
};

const menuItems = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Find Jobs",
    path: "/Find-Jobs",
  },
  {
    title: "Contact Us",
    path: "/contact",
  },
  {
    title: "Services",
    path: "/",
  },
  {
    title: "Login",
    path: "/auth/signin",
  },
  {
    title: "Resister",
    path: "/auth/signup",
  },
];

export default NextNavbar;
