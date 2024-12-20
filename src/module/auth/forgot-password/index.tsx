"use client";
import { FC, useRef, useEffect, useState, ChangeEvent } from "react";
import AuthLayout from "../components/auth-layout";
import TextField, {
  TextFieldRefProps,
} from "@contact-book/src/components/Form/TextField";
import Link from "next/link";

const AuthForgotPassword: FC = () => {
  const emailAddressRef = useRef<TextFieldRefProps | null>(null);
  const [email, setEmail] = useState("");

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
  };

  useEffect(() => {
    emailAddressRef.current?.focus();
  }, []);

  return (
    <AuthLayout
      className="w-[500px]"
      tagLine="Build Your Ultimate ContactBook"
      heading="Forgot Password"
    >
      <form className="w-full text-center">
        <TextField
          ref={emailAddressRef}
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Please enter your email address"
        />
        <button className="w-full px-6 py-3 border rounded-full mt-5 font-semibold border-amber-400 text-amber-500 bg-amber-50 transition-all hover:bg-amber-500 hover:text-white">
          Send email address
        </button>
        <div className="text-gray-400 mt-2 text-sm text-center">
          If you remember your password, please
          <Link
            href="/login"
            className="text-amber-400 hover:text-amber-500 underline font-semibold pl-1"
          >
            log in
          </Link>
          . If you don&apos;t have an account yet, please create
          <Link
            href="/register"
            className="text-amber-400 hover:text-amber-500 underline pl-1 font-semibold"
          >
            one
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
export default AuthForgotPassword;
