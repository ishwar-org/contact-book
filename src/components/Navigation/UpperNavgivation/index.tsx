import Link from "next/link";
import { FC } from "react";

const UpperNavigation: FC = () => {
  return (
    <div className="flex justify-center items-center bg-white shadow px-3 py-4 fixed top-0 left-17 w-full">
      <Link href="/" className="font-semibold text-2xl">
        Contact<span className="text-amber-500">Book</span>
      </Link>
    </div>
  );
};
export default UpperNavigation;
