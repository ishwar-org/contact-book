"use client";
import TextField, {
  TextFieldRefProps,
} from "@contact-book/src/components/Form/TextField";
import { FC, use, useEffect, useMemo, useRef } from "react";
import { Switch } from "@contact-book/components/ui/switch";
import { useFormik } from "formik";
import classNames from "classnames";
import {
  useContactBook,
  useEditContact,
  ContactBookDetails,
} from "../datat-access";
import { useRouter } from "next/navigation";

enum GROUPS {
  FMAILY = "Family",
  FRIENDS = "Friends",
  OFFICE = "Office",
}

interface EditContactParams {
  params: Promise<{
    id: string;
  }>;
}

interface EditContactFields {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  mobileNumber: string;
  groups: string[];
  address?: string;
  city?: string;
  state?: string;
  zipCode: string;
}

const EditContact: FC<EditContactParams> = ({ params }) => {
  const router = useRouter();
  const resolvedParams = use(params);
  const { data: getContactBook } = useContactBook();
  const { editContact } = useEditContact();
  const editContactBookData = useMemo(() => {
    return getContactBook?.filter(
      (contactbook) => contactbook.id === resolvedParams.id
    )[0];
  }, [getContactBook, resolvedParams.id]);
  const firstNameRef = useRef<TextFieldRefProps>(null);

  const initialEditContatcField = {
    firstName: editContactBookData?.firstName || "",
    middleName: editContactBookData?.middleName || "",
    lastName: editContactBookData?.lastName || "",
    phoneNumber: editContactBookData?.phoneNumber || "",
    mobileNumber: editContactBookData?.mobileNumber || "",
    groups: editContactBookData?.groups || [GROUPS.FMAILY],
    address: editContactBookData?.address || "",
    city: editContactBookData?.city || "",
    state: editContactBookData?.state || "",
    zipCode: editContactBookData?.zipCode || "",
  };

  const handleCancel = () => {
    router.push("/contact-dashboard");
  };

  const handleSaveChanges = async (values: ContactBookDetails) => {
    await editContact(values, {
      onSuccess: () => {
        handleCancel();
      },
    });
  };

  const editContactFormik = useFormik({
    initialValues: initialEditContatcField as EditContactFields,
    enableReinitialize: !!editContactBookData,
    onSubmit: (values) => {
      const formData = {
        ...values,
        id: resolvedParams.id,
      };
      handleSaveChanges(formData);
    },
  });

  const handleButtonChange = (checked: boolean, value: string) => {
    const updatedGroups = checked
      ? [...editContactFormik.values.groups, value as GROUPS]
      : editContactFormik.values.groups.filter((group) => group !== value);

    editContactFormik.setFieldValue("groups", updatedGroups);
  };

  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  return (
    <div className="w-[600px] px-2 mx-auto flex justify-center flex-col items-center">
      <div className="w-[350px] mx-auto text-center">
        <h1 className="text-2xl text-gray-500 font-semibold mb-1">
          Edit Contact
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
            value={editContactFormik.values.firstName}
            placeholder="First Name"
            onChange={editContactFormik.handleChange}
          />
          <TextField
            className="mb-5 w-full"
            name="middleName"
            value={editContactFormik.values.middleName}
            placeholder="Middle Name"
            onChange={editContactFormik.handleChange}
          />
          <TextField
            className="mb-5 w-full"
            name="lastName"
            value={editContactFormik.values.lastName}
            placeholder="Last Name"
            onChange={editContactFormik.handleChange}
          />
        </div>
        <div className="flex gap-4">
          <TextField
            className="mb-5 w-full"
            name="phoneNumber"
            value={editContactFormik.values.phoneNumber}
            placeholder="Phone Number"
            onChange={editContactFormik.handleChange}
          />
          <TextField
            className="mb-5 w-full"
            name="mobileNumber"
            value={editContactFormik.values.mobileNumber}
            placeholder="Mobile Number"
            onChange={editContactFormik.handleChange}
          />
        </div>
        <TextField
          className="mb-5 w-full"
          name="address"
          value={editContactFormik.values.address || ""}
          placeholder="Address"
          onChange={editContactFormik.handleChange}
        />
        <div className="flex gap-4">
          <TextField
            className="mb-5 w-full"
            name="city"
            value={editContactFormik.values.city || ""}
            placeholder="City"
            onChange={editContactFormik.handleChange}
          />
          <TextField
            className="mb-5 w-full"
            name="state"
            value={editContactFormik.values.state || ""}
            placeholder="State"
            onChange={editContactFormik.handleChange}
          />
          <TextField
            className="mb-5"
            name="zipCode"
            value={editContactFormik.values.zipCode || ""}
            placeholder="Zipcode"
            onChange={editContactFormik.handleChange}
          />
        </div>
        <div className="flex w-full mb-8 gap-2 border border-amber-300 p-4 rounded-lg">
          {Object.values(GROUPS).map((group) => (
            <div className="flex gap-2 justify-center items-center" key={group}>
              <Switch
                id={group}
                value={group}
                name="groups"
                checked={editContactFormik.values.groups.includes(group)}
                onCheckedChange={(checked) =>
                  handleButtonChange(checked, group)
                }
              ></Switch>
              <label
                htmlFor={group}
                className={classNames("text-gray-400 text-sm", {
                  "text-gray-500":
                    editContactFormik.values.groups.includes(group),
                })}
              >
                {group}
              </label>
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={editContactFormik.submitForm}
            className="w-full px-6 py-3 border rounded-full font-semibold border-amber-400 text-amber-500 bg-amber-50 transition-all hover:bg-amber-500 hover:text-white"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="w-full px-6 py-3 rounded-full font-semibold border border-gray-400 text-gray-600 bg-gray-50 transition-all hover:bg-gray-400 hover:text-white"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditContact;
