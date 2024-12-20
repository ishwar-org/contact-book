"use client";
import TextField, {
  TextFieldRefProps,
} from "@contact-book/src/components/Form/TextField";
import { FC, useState, useRef, ChangeEvent, useEffect } from "react";

interface PasswordDetails {
  newPassword: string;
  confirmPassword: string;
}

const Settings: FC = () => {
  const newPasswordRef = useRef<TextFieldRefProps>(null);
  const initialState: PasswordDetails = {
    newPassword: "",
    confirmPassword: "",
  };
  const [{ newPassword, confirmPassword }, setSettingField] =
    useState(initialState);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSettingField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    newPasswordRef.current?.focus();
  }, []);

  return (
    <div className="w-full">
      <div className="w-[600px] px-2 mx-auto flex justify-center flex-col items-center">
        <h1 className="text-xl text-gray-500 font-semibold mb-6">Settings</h1>
        <form className="w-full">
          <TextField
            className="mb-4"
            ref={newPasswordRef}
            name="newPassword"
            value={newPassword}
            placeholder="New Password"
            onChange={handleOnChange}
          />
          <TextField
            className="mb-4"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={handleOnChange}
          />
          <button className="w-full px-6 py-3 border rounded-full font-semibold border-amber-400 text-amber-500 bg-amber-50 transition-all hover:bg-amber-500 hover:text-white">
            Save Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
