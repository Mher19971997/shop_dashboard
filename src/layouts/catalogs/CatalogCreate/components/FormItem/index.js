import React from "react";
import PropTypes from "prop-types";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";

const FormItem = ({ label, type, name, fullWidth,required }) => {
  return (
    <SoftBox>
      <SoftBox mb={1} ml={0.5}>
        <SoftTypography component="h3" variant="caption" color="info" fontWeight="bold" textGradient>
          {label}
        </SoftTypography>
      </SoftBox>
      <SoftInput fullWidth={fullWidth} required={required} type={type} id={name} name={name} label={label} />
    </SoftBox>
  );
};

FormItem.defaultProps = {
  type: "text",
  fullWidth: false,
  required: false
};

FormItem.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  fullWidth: PropTypes.bool,
  required: PropTypes.bool,
};

export default FormItem;
