import { stringAvatar } from "@contact-book/src/utils/common";
import { Edit2, Trash2 } from "lucide-react";
import { FC } from "react";
import { useDeleteContact } from "../../../datat-access";
import Link from "next/link";
import Image from "next/image";

interface ListItemProps {
  id: string;
  src?: string;
  fullName: string;
  phoneNumber: string;
  mobileNumber: string;
  groups: string[];
}

const ListItem: FC<ListItemProps> = ({
  id,
  src = "",
  fullName,
  phoneNumber = "",
  mobileNumber,
  groups,
}) => {
  const { deleteContact } = useDeleteContact();
  const avatar = stringAvatar(fullName);

  const onDeleteContact = async (contactId: string) => {
    await deleteContact(contactId);
  };

  return (
    <div className="grid grid-rows-1 grid-cols-5 p-3 border border-transparent transition-colors text-gray-400 hover:shadow-lg hover:rounded-lg hover:bg-amber-50 hover:text-gray-600 justify-center items-center">
      <div className="flex justify-start items-center gap-3">
        {src ? (
          <Image src={src} alt={fullName} width={60} height={60} />
        ) : (
          <div
            className="w-[40px] h-[40px] text-white flex justify-center text-sm items-center rounded-full font-semibold"
            style={{ backgroundColor: avatar?.sx.bgcolor }}
          >
            {avatar?.children}
          </div>
        )}

        <div className="text-sm">{fullName}</div>
      </div>
      <div className="text-sm">{mobileNumber}</div>
      <div className="text-sm">{phoneNumber || "-"}</div>
      <div className="text-sm">
        {groups.map((group) => (
          <span
            key={group}
            className="px-2.5 py-0.5 mr-1.5 border border-amber-400 bg-amber-200 rounded-full text-gray-400"
          >
            {group}
          </span>
        ))}
      </div>
      <div className="flex justify-end items-center gap-2">
        <Link
          href={`/edit-contact/${id}`}
          className="w-[40px] h-[40px] text-sm flex justify-center items-center cursor-pointer rounded-full hover:bg-gray-200"
        >
          <Edit2 size={20} className="text-blue-400" />
        </Link>
        <div
          className="w-[40px] h-[40px] text-sm flex justify-center items-center cursor-pointer rounded-full hover:bg-gray-200"
          onClick={() => onDeleteContact(id)}
        >
          <Trash2 size={20} className="text-red-500" />
        </div>
      </div>
    </div>
  );
};
export default ListItem;
