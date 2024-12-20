import SideNavigation from "@contact-book/src/components/Navigation/SideNavigation";
import UpperNavigation from "@contact-book/src/components/Navigation/UpperNavgivation";
import { FC, ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="w-[3%] md:w-[3%] lg:w-[4%] xl:w-[4%] relative">
        <SideNavigation />
      </div>
      <div className="w-[97%] md:w-[97%] lg:w-[96%] xl:w-[96%] relative">
        <UpperNavigation />
        <div className="mt-[100px]">{children}</div>
      </div>
    </div>
  );
};
export default DashboardLayout;
