import React from "react";
import { IconButton } from "@mui/material";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftModal from "components/SoftModal";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";

const UserEdit = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const user = { email: email, password: password };
  };

  return (
    <SoftBox>
      <IconButton size="small" onClick={handleOpen}>
        <Icon fontSize="small" color="success">
          edit_icon
        </Icon>
      </IconButton>
      <SoftModal title="Edit User" open={open} handleClose={handleClose}>
        <SoftBox component="form" role="form" onSubmit={submitHandler}>
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Email
              </SoftTypography>
            </SoftBox>
            <SoftInput type="email" placeholder="Email" id="email" name="email" />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Roles
              </SoftTypography>
            </SoftBox>
            <SoftInput type="text" placeholder="Roles" id="roles" name="roles" />
          </SoftBox>
          <SoftBox mt={4} mb={1}>
            <SoftButton type="submit" variant="gradient" color="info">
              update
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </SoftModal>
    </SoftBox>
  );
};

export default UserEdit;
