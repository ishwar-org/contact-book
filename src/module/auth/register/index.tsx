"use client";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import AuthLayout from "../components/auth-layout";
import TextField, {
  TextFieldRefProps,
} from "@contact-book/src/components/Form/TextField";
import Link from "next/link";

const AuthRegister: FC = () => {
  const firstNameRef = useRef<TextFieldRefProps | null>(null);
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [{ firstName, lastName, email, password }, setRegisterField] =
    useState(initialState);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  return (
    <AuthLayout
      className="w-[550px]"
      tagLine="Where Connections Come Alive!"
      heading="Register"
    >
      <form className="w-full text-center">
        <div className="flex gap-4 w-full">
          <TextField
            className="mb-5 w-full"
            ref={firstNameRef}
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={handleOnChange}
          />
          <TextField
            className="mb-5 w-full"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={handleOnChange}
          />
        </div>
        <TextField
          className="mb-5 w-full"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={handleOnChange}
        />
        <TextField
          className="w-full"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleOnChange}
        />
        <button className="w-full px-6 py-3 border rounded-full mt-5 font-semibold border-amber-400 text-amber-500 bg-amber-50 transition-all hover:bg-amber-500 hover:text-white">
          Register
        </button>
        <div className="text-gray-400 mt-2 text-sm text-center">
          If you already have an account, please
          <Link
            href="/login"
            className="text-amber-400 hover:text-amber-500 font-semibold underline pl-1"
          >
            log in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
export default AuthRegister;
