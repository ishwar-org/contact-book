"use client";
import { ChangeEvent, FC, useState } from "react";
import List from "./components/List";
import TextField from "@contact-book/src/components/Form/TextField";
import { useContactBook } from "../datat-access";

const ContactDashboard: FC = () => {
  const [searchText, setSearchText] = useState("");
  const { data } = useContactBook();

  const onSearchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchText(value);
  };

  return (
    <div className="px-5 w-full overflow-y-auto h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl text-gray-500 font-semibold">
          Dashboard{" "}
          <span className="text-base text-amber-500">({data?.length})</span>
        </h1>
        <div className="w-[20%]">
          <TextField
            name="searchText"
            value={searchText}
            placeholder="Search contact..."
            onChange={onSearchHandler}
          />
        </div>
      </div>
      <List />
    </div>
  );
};
export default ContactDashboard;
