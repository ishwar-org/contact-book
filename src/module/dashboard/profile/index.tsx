"use client";
import TextField, {
  TextFieldRefProps,
} from "@contact-book/src/components/Form/TextField";
import { FC, useState, useRef, ChangeEvent, useEffect } from "react";

interface ProfileDetails {
  firstName: string;
  lastName: string;
  emailAddress: string;
}

const Profile: FC = () => {
  const firstNameRef = useRef<TextFieldRefProps>(null);
  const initialState: ProfileDetails = {
    firstName: "",
    lastName: "",
    emailAddress: "",
  };
  const [{ firstName, lastName, emailAddress }, setProfileField] =
    useState(initialState);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfileField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  return (
    <div className="w-full">
      <div className="w-[600px] px-2 mx-auto flex justify-center flex-col items-center">
        <h1 className="text-xl text-gray-500 font-semibold mb-6">Profile</h1>
        <form className="w-full">
          <TextField
            className="mb-4 w-full"
            ref={firstNameRef}
            name="firstName"
            value={firstName}
            placeholder="First Name"
            onChange={handleOnChange}
          />
          <TextField
            className="mb-4"
            name="lastName"
            value={lastName}
            placeholder="Last Name"
            onChange={handleOnChange}
          />
          <TextField
            className="mb-4"
            name="emailAddress"
            value={emailAddress}
            placeholder="Email Address"
            onChange={handleOnChange}
          />
          <button className="w-full px-6 py-3 border rounded-full font-semibold border-amber-400 text-amber-500 bg-amber-50 transition-all hover:bg-amber-500 hover:text-white">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};
export default Profile;
