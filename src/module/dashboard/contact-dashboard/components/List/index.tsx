import { FC } from "react";
import ListItem from "../ListItem";
import { useContactBook } from "../../../datat-access";

const List: FC = () => {
  const { data } = useContactBook();
  console.log(data);
  return (
    <div className="W-full">
      {data?.map((data) => (
        <ListItem
          key={data.id}
          id={data.id}
          fullName={`${data.firstName} ${data.lastName}`}
          phoneNumber={data.phoneNumber || ""}
          mobileNumber={data.mobileNumber}
          groups={data.groups}
        />
      ))}
    </div>
  );
};
export default List;
