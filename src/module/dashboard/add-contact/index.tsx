"use client";
import TextField, {
  TextFieldRefProps,
} from "@contact-book/src/components/Form/TextField";
import { FC, useRef, useEffect, useState, ChangeEvent } from "react";
import { Switch } from "@contact-book/components/ui/switch";
import classNames from "classnames";
import { useAddContact } from "../datat-access";
import { useRouter } from "next/navigation";

export enum GROUPS {
  FMAILY = "Family",
  FRIENDS = "Friends",
  OFFICE = "Office",
}

interface AddContactDetails {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  mobileNumber: string;
  groups: Array<GROUPS>;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

const AddContact: FC = () => {
  const router = useRouter();
  const { saveContact } = useAddContact();
  const firstNameRef = useRef<TextFieldRefProps | null>(null);
  const initialState: AddContactDetails = {
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    mobileNumber: "",
    groups: [GROUPS.FMAILY],
    address: "",
    city: "",
    state: "",
    zipCode: "",
  };
  const [
    {
      firstName,
      middleName,
      lastName,
      phoneNumber,
      mobileNumber,
      groups,
      address,
      city,
      state,
      zipCode,
    },
    setAddContactFields,
  ] = useState(initialState);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddContactFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleButtonChange = (checked: boolean, value: string) => {
    setAddContactFields((prevState) => {
      const updatedGroups = checked
        ? [...prevState.groups, value as GROUPS]
        : prevState.groups.filter((group) => group !== value);
      return {
        ...prevState,
        groups: updatedGroups,
      };
    });
  };

  const handleAddContact = async () => {
    const newContact = {
      id: String(Date.now()),
      firstName,
      middleName,
      lastName,
      phoneNumber,
      mobileNumber,
      groups,
      address,
      city,
      state,
      zipCode,
    };
    await saveContact(newContact, {
      onSuccess: () => {
        router.push("contact-dashboard");
      },
    });
  };

  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  return (
    <div className="w-full">
      <div className="w-[600px] px-2 mx-auto flex justify-center flex-col items-center">
        <div className="w-[350px] mx-auto text-center">
          <h1 className="text-2xl text-gray-500 font-semibold mb-1">
            Add Contact
          </h1>
          <span className="text-gray-400 mt-2 text-sm">
            Your connections, all in one place. Easily manage and access your
            contacts with ease. Stay connected, stay organized!
          </span>
        </div>
        <form className="mt-[35px] p-4">
          <div className="flex gap-4">
            <TextField
              className="mb-5 w-full "
              ref={firstNameRef}
              name="firstName"
              value={firstName}
              placeholder="First Name"
              onChange={handleOnChange}
            />
            <TextField
              className="mb-5 w-full"
              name="middleName"
              value={middleName}
              placeholder="Middle Name"
              onChange={handleOnChange}
            />
            <TextField
              className="mb-5 w-full"
              name="lastName"
              value={lastName}
              placeholder="Last Name"
              onChange={handleOnChange}
            />
          </div>
          <div className="flex gap-4">
            <TextField
              className="mb-5 w-full"
              name="phoneNumber"
              value={phoneNumber}
              placeholder="Phone Number"
              onChange={handleOnChange}
            />
            <TextField
              className="mb-5 w-full"
              name="mobileNumber"
              value={mobileNumber}
              placeholder="Mobile Number"
              onChange={handleOnChange}
            />
          </div>
          <TextField
            className="mb-5 w-full"
            name="address"
            value={address || ""}
            placeholder="Address"
            onChange={handleOnChange}
          />
          <div className="flex gap-4">
            <TextField
              className="mb-5 w-full"
              name="city"
              value={city || ""}
              placeholder="City"
              onChange={handleOnChange}
            />
            <TextField
              className="mb-5 w-full"
              name="state"
              value={state || ""}
              placeholder="State"
              onChange={handleOnChange}
            />
            <TextField
              className="mb-5"
              name="zipCode"
              value={zipCode || ""}
              placeholder="Zipcode"
              onChange={handleOnChange}
            />
          </div>
          <div className="flex w-full mb-8 gap-2 border border-amber-300 p-4 rounded-lg">
            {Object.values(GROUPS).map((group) => (
              <div
                className="flex gap-2 justify-center items-center"
                key={group}
              >
                <Switch
                  id={group}
                  value={group}
                  name="groups"
                  checked={groups.includes(group)}
                  onCheckedChange={(checked) =>
                    handleButtonChange(checked, group)
                  }
                ></Switch>
                <label
                  htmlFor={group}
                  className={classNames("text-gray-400 text-sm", {
                    "text-gray-500": groups.includes(group),
                  })}
                >
                  {group}
                </label>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddContact}
            className="w-full px-6 py-3 border rounded-full font-semibold border-amber-400 text-amber-500 bg-amber-50 transition-all hover:bg-amber-500 hover:text-white"
          >
            Add Contact
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddContact;
