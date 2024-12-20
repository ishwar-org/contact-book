"use client";
import TextField, {
  TextFieldRefProps,
} from "@contact-book/src/components/Form/TextField";
import Link from "next/link";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import AuthLayout from "../components/auth-layout";

const AuthLogin: FC = () => {
  const usernameRef = useRef<TextFieldRefProps>(null);
  const initialState = {
    username: "",
    password: "",
  };
  const [{ username, password }, setLoginField] = useState(initialState);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  return (
    <AuthLayout
      className="w-[450px]"
      tagLine="Stay Connected, Stay Organized"
      heading="Login"
    >
      <form className="w-full text-center">
        <TextField
          className="mb-5"
          ref={usernameRef}
          name="username"
          value={username}
          onChange={handleOnChange}
          placeholder="Username or Email Address"
        />
        <TextField
          name="password"
          value={password}
          type="password"
          onChange={handleOnChange}
          placeholder="Password"
        />
        <div className="flex justify-end mt-1">
          <Link
            href="/forgot-password"
            className="text-amber-400 hover:text-amber-500 underline text-sm"
          >
            Forgot password?
          </Link>
        </div>
        <button className="w-full px-6 py-3 border rounded-full mt-6 font-semibold border-amber-400 text-amber-500 bg-amber-50 transition-all hover:bg-amber-500 hover:text-white">
          Login
        </button>
        <div className="text-gray-400 mt-2 text-sm text-center">
          If you don’t have an account yet, create
          <Link
            href="/register"
            className="text-amber-400 hover:text-amber-500 underline font-semibold pl-1 pr-1"
          >
            one
          </Link>
          now
        </div>
      </form>
    </AuthLayout>
  );
};
export default AuthLogin;
