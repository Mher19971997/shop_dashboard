import React, { useState } from "react";
import { useQuery } from "react-query";
import * as moment from "moment";
import { useSoftUIController } from "context";

import { Avatar, AvatarGroup, Card } from "@mui/material";
import Table from "examples/Tables/Table";

// example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import UserDelete from "./components/UserDelete";

import usersTableData from "./data/usersTableData";
import { getCatalogs } from "http/catalogApi";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import Icon from "@mui/material/Icon";
import SoftButton from "components/SoftButton";

const Catalogs = () => {
  const [controller, dispatch] = useSoftUIController();
  const navigate = useNavigate();
  const { skeletonRows, columns } = usersTableData();
  const { userRole } = controller;

  const [page, setPage] = useState(1);
  // const limit = 12;

  const { isLoading, data: catalogs } = useQuery(["getCatalogs", page], () => getCatalogs());

  const usertableRowData = catalogs?.data.map((catalog, index) => ({
    id: ++index,
    images: (
      <AvatarGroup max={5}>
        {catalog?.images.map(({ uuid, image }) => (
          <Avatar key={uuid} alt="Remy Sharp" src={`http://localhost:3001/${image}`} />
        ))}
      </AvatarGroup>
    ),
    name: catalog.name,
    description: (
      <SoftTypography
        sx={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          width: "210px",
          height: "1.2em",
          whiteSpace: "nowrap",
        }}
        variant="h6" color="text" fontWeight="light"
      >
        {catalog.description}
      </SoftTypography>
    ),
    price: catalog.price,
    createdAt: moment(catalog.createdAt).format("HH:mm, DD.MM.YYYY"),
    [" "]: (
      <SoftBox display="flex" alignItems="center" gap={2} justifyContent="space-between">
        <IconButton size="small" onClick={() => navigate(`/catalogs/${catalog.uuid}`)}>
          <Icon fontSize="small" color="success">
            edit_icon
          </Icon>
        </IconButton>
        <UserDelete uuid={catalog.uuid} />
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
              <SoftTypography variant="h5" color="info" fontWeight="bold" textGradient>
                Catalogs Table
              </SoftTypography>
              <SoftButton
                variant="gradient"
                color="info"
                onClick={() => navigate(`/catalogCreate`)}
              >
                Add Catalog
              </SoftButton>
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

export default Catalogs;
