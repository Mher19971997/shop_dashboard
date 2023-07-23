import React from "react";
import ZoomSlider from "components/ZoomSlider";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftBox from "components/SoftBox";
import { Card, Rating } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import { useParams } from "react-router-dom";
import { getCatalogByUuid } from "http/catalogApi";
import { useQuery } from "react-query";
import PriceCard from "layouts/CatalogPage/components/PriceCard";
import CommentCard from "./components/CommentCard";

const CatalogPage = ({}) => {
  const { uuid } = useParams();

  const { isLoading, data: catalog } = useQuery("device", () => getCatalogByUuid(uuid));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card sx={{ paddingBottom: 3 }}>
            <SoftBox p={3}>
              <SoftBox mb={3}>
                <SoftTypography variant="h5" color="info" fontWeight="bold" textGradient>
                  {catalog?.name}
                </SoftTypography>
              </SoftBox>
              <SoftBox display="flex" justifyContent="space-between" gap={3} pr={5}>
                <SoftBox display="flex" gap={2}>
                  {!isLoading && (
                    <ZoomSlider
                      images={catalog?.images.map((item) => ({
                        image: `http://localhost:3001/${item?.image}`,
                      }))}
                    />
                  )}
                  <SoftBox>
                    <SoftTypography variant="h5" color="inherit" fontWeight="medium" mb={2}>
                      Дополнительная информация
                    </SoftTypography>
                    {catalog?.catalogInfos.map((item) => (
                      <SoftTypography
                        key={item.uuid}
                        variant="h6"
                        color="inherit"
                        fontWeight="regular"
                      >
                        {item.title} - - - - - - - {item.description}
                      </SoftTypography>
                    ))}
                  </SoftBox>
                </SoftBox>
                <SoftBox>
                  <PriceCard price={catalog?.price} />
                </SoftBox>
              </SoftBox>
              <SoftBox mt={3}>
                <SoftTypography variant="h5" color="inherit" fontWeight="medium" mb={2}>
                  Описание
                </SoftTypography>
                <SoftTypography variant="h6" color="inherit" fontWeight="regular">
                  {catalog?.description}
                </SoftTypography>
              </SoftBox>


              <SoftTypography variant="h3" color="inherit" mt={3} mb={2}>
                  Comments
                </SoftTypography>
              <SoftBox display="flex" alignItems="center" gap={1.5} >
                {catalog?.comments?.map((comment) => (
                  <CommentCard key={comment.uuid} name={comment.users.email} text={comment.text} />
                ))}
              </SoftBox>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
};

CatalogPage.propTypes = {};

export default CatalogPage;
