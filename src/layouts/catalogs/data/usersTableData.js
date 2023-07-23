import { Skeleton } from "@mui/material";
import { generateData } from "utils/tableColumnData";

const data = () => {
  return {
    columns: [
      { name: "id", accessor: "id", align: "center" },
      { name: "images", accessor: "images", align: "left" },
      { name: "name", accessor: "name", align: "left" },
      { name: "description", accessor: "description", align: "left" },
      { name: "price", accessor: "price", align: "center" },
      { name: "createdAt", accessor: "createdAt", align: "center" },
      { name: " ", accessor: " ", align: "right" },
    ],
    skeletonRows: generateData(3, {
      uuid: <Skeleton variant="text" sx={{ fontSize: "14px" }} width={260} />,
      userId: <Skeleton variant="text" sx={{ fontSize: "14px" }} width={40} />,
      images: <Skeleton variant="text" sx={{ fontSize: "14px" }} width={155} />,
      role: <Skeleton variant="text" sx={{ fontSize: "14px" }} width={70} />,
      createdAt: <Skeleton variant="text" sx={{ fontSize: "14px" }} width={100} />,
      [" "]: <></>,
    }),
  };
};

export default data;
