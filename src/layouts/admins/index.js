import React, { useState } from "react";
import { useQuery } from "react-query";
import * as moment from "moment";
import { useSoftUIController } from "context";

import { Card } from "@mui/material";
import Table from "examples/Tables/Table";

// example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
// import UserDelete from "./components/UserDelete";
// import UserEdit from "./components/UserEdit";
// import UserCreate from "./components/UserCreate";

import usersTableData from "./data/usersTableData";
import { getUsers } from "http/userApi";

const Admins = () => {
  const [controller, dispatch] = useSoftUIController();

  const { skeletonRows, columns } = usersTableData();
  const { userRole } = controller;

  const [page, setPage] = useState(1);
  // const limit = 12;

  const { isLoading, data: admins } = useQuery(["realusers", page], () => getUsers());

  const usertableRowData = admins?.data.map((admin, index) => ({
    userId: ++index,
    ["email"]: admin.email,
    uuid: admin.uuid,
    createdAt: moment(admin.createdAt).format("HH:mm, DD.MM.YYYY"),
    ["role"]: admin.role,
    [" "]: userRole === "superAdmin" && (
      <SoftBox display="flex" alignItems="center" gap={2} justifyContent="space-between">
        {/* <UserEdit />
        <UserDelete /> */}
      </SoftBox>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h5" color="inherit" fontWeight="regular">
                Users table
              </SoftTypography>
              {/* {userRole === "superAdmin" && <UserCreate />} */}
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={isLoading ? skeletonRows : usertableRowData} />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
};

export default Admins;
