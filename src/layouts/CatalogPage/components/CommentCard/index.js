import React from "react";
import PropTypes from "prop-types";
import { Card } from "@mui/material";
import { Avatar } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import avatar from "assets/images/team-4.jpg";

const CommentCard = ({ text, name }) => {
  return (
    <Card
      sx={({ borders: { borderWidth, borderColor } }) => ({
        backgroundColor: "transparent",
        border: `${borderWidth[1]} solid ${borderColor}`,
        width: "250px",
        height: "150px",
      })}
    >
      <SoftBox display="flex" flexDirection="column" height="100%" p={2} gap={2}>
        <SoftBox display="flex" alignItems="center" gap={1}>
          <Avatar
            sx={{
              cursor: "pointer",
              height: 23,
              width: 23,
            }}
            src={avatar}
          />
          <SoftTypography variant="h6" fontWeight="light">
            {name}
          </SoftTypography>
        </SoftBox>
        <SoftTypography variant="h6" fontWeight="light">
          {text}
        </SoftTypography>
      </SoftBox>
    </Card>
  );
};

CommentCard.propTypes = {
  text: PropTypes.string,
  name: PropTypes.string,
};

export default CommentCard;