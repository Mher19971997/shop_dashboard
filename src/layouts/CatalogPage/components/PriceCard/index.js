import React from "react";
import PropTypes from "prop-types";
import { Card } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";

const PriceCard = ({ price }) => {
  return (
    <Card
      sx={({ borders: { borderWidth, borderColor } }) => ({
        backgroundColor: "transparent",
        border: `${borderWidth[1]} solid ${borderColor}`,
        width: "250px",
        height: "150px",
      })}
    >
      <SoftBox
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
        p={2}
      >
        <SoftTypography variant="h6" fontWeight="normal" textTransform="capitalize">
          Price: {price}
        </SoftTypography>
        <SoftButton variant="gradient" color="info">
          Edit
        </SoftButton>
      </SoftBox>
    </Card>
  );
};

PriceCard.propTypes = {
  price: PropTypes.number,
};

export default PriceCard;
