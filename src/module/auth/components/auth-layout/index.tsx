import { FC, ReactNode } from "react";
import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";

interface AuthLayoutProps {
  className?: string;
  children: ReactNode;
  tagLine: string;
  heading: string;
}

const AuthLayout: FC<AuthLayoutProps> = ({
  className,
  children,
  tagLine,
  heading,
}) => {
  return (
    <div className="flex h-screen justify-center items-center w-[1200px] mx-auto">
      <div className="p-[30px]">
        <Image
          src="/contactbook-walk.svg"
          alt="contactboox-walk"
          width={500}
          height={500}
        />
      </div>
      <div
        className={classNames(
          "flex flex-col justify-center items-center mx-auto p-6 rounded-md",
          className
        )}
      >
        <div className="mb-4 text-center">
          <Link href="/" className="text-6xl font-semibold">
            Contact<span className="text-amber-500">Book</span>
          </Link>
          <p className="text-gray-400 mt-2 text-sm">- {tagLine}</p>
        </div>
        <h3 className="text-xl text-gray-500 font-semibold mb-6">{heading}</h3>
        {children}
      </div>
    </div>
  );
};
export default AuthLayout;
