import { Skeleton } from "@mui/material";
import { generateData } from "utils/tableColumnData";

const data = () => {
  return {
    columns: [
      { name: "userId", accessor: "userId", align: "center" },
      { name: "email", accessor: "email", align: "left" },
      { name: "uuid", accessor: "uuid", align: "left" },
      { name: "createdAt", accessor: "createdAt", align: "left" },
      { name: "role", accessor: "role", align: "center" },
      { name: " ", accessor: " ", align: "right" },
    ],
    skeletonRows: generateData(3, {
      userId: <Skeleton variant="text" sx={{ fontSize: "14px" }} width={40} />,
      ["email"]: <Skeleton variant="text" sx={{ fontSize: "14px" }} width={155} />,
      uuid: <Skeleton variant="text" sx={{ fontSize: "14px" }} width={260} />,
      ["role"]: <Skeleton variant="text" sx={{ fontSize: "14px" }} width={70} />,
      ["createdAt"]: <Skeleton variant="text" sx={{ fontSize: "14px" }} width={100} />,
      [" "]: <></>,
    }),
  };
};

export default data;
