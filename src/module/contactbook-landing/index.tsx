import Link from "next/link";
import Image from "next/image";
import { FC } from "react";

const ContactBookLanding: FC = () => {
  return (
    <div className="w-full h-screen">
      <header className="flex justify-center shadow-md p-6 bg-white fixed w-full">
        <Link
          href={"/"}
          className="font-semibold text-2xl w-50 h-50 p-2 bg-amber-50 rounded-full"
        >
          C<span className="text-amber-500">B</span>
        </Link>
      </header>
      <main className="flex flex-col w-full h-screen">
        <div className="flex justify-between w-[1000] h-full mx-auto py-[0] items-center gap-20">
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-6xl mb-2">👋</h1>
            <h1 className="text-lg text-gray-500">Your</h1>
            <h3 className="text-6xl font-semibold">
              Contact<span className="text-amber-500">Book</span>
            </h3>
            <p className="text-gray-400 mt-2 text-sm">
              - Simplify Connections, Amplify Relationships.
            </p>
            <Link
              href="/login"
              className="px-6 py-3 border rounded-full mt-6 font-semibold border-amber-400 text-amber-500 bg-amber-50 transition-all hover:bg-amber-500 hover:text-white"
            >
              Create your first contact
            </Link>
          </div>
          <div className="flex">
            <Image
              src="/contactbook.svg"
              alt="contactbook"
              width="900"
              height="900"
            />
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mb-3">
          Developed by <span className="text-amber-400">Ishwar Deoolkar</span>
        </div>
      </main>
    </div>
  );
};
export default ContactBookLanding;
