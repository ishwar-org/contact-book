"use client";
import { FC } from "react";
import {
  MdOutlineDashboardCustomize,
  MdPowerSettingsNew,
} from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { FaCircleUser } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const sideNavMenu = {
  topNav: [
    {
      label: "Dashboard",
      url: "/contact-dashboard",
      icon: <MdOutlineDashboardCustomize />,
    },
    { label: "Add Contact", url: "/add-contact", icon: <IoMdPersonAdd /> },
  ],
  bottomNav: [
    { label: "Settings", url: "/settings", icon: <CiSettings /> },
    { label: "Profile", url: "/profile", icon: <FaCircleUser /> },
    { label: "Logout", url: "/logout", icon: <MdPowerSettingsNew /> },
  ],
};

const SideNavigation: FC = () => {
  const pathname = usePathname();
  return (
    <div className="bg-amber-200 shadow-md h-full lg:px-3 lg:py-4 2xl:px-5 2xl:py-4 flex flex-col justify-between items-center gap-5 fixed top-0 left-0">
      <div className="w-full flex flex-col justify-center items-center">
        <Link
          href="/"
          className="font-semibold text-base text-center w-[35px] h-[35px] bg-amber-400 flex justify-center items-center rounded-full"
        >
          <span>C</span>
          <span className="text-white">B</span>
        </Link>
        <ul className="mt-[60px] flex flex-col justify-center items-center gap-4">
          {sideNavMenu.topNav.map((nav) => (
            <li
              key={nav.label}
              className={classNames(
                "w-[30px] h-[30px] text-center rounded-full text-gray-500 cursor-pointer inline-flex justify-center items-center text-lg transition-all hover:bg-amber-500 hover:text-white",
                {
                  "bg-amber-500 text-white": pathname === nav.url,
                }
              )}
            >
              <Link href={nav.url}>{nav.icon}</Link>
            </li>
          ))}
        </ul>
      </div>

      <ul className="flex flex-col justify-center items-center gap-4">
        {sideNavMenu.bottomNav.map((nav) => (
          <li
            key={nav.label}
            className={classNames(
              "w-[30px] h-[30px] text-center rounded-full text-gray-500 cursor-pointer inline-flex justify-center items-center text-lg transition-all hover:bg-amber-500 hover:text-white",
              {
                "bg-amber-500 text-white": pathname === nav.url,
              }
            )}
          >
            <Link href={nav.url}>{nav.icon}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SideNavigation;
