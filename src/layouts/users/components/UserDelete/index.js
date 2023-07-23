import React from "react";
import { IconButton } from "@mui/material";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftModal from "components/SoftModal";
import SoftButton from "components/SoftButton";

const UserDelete = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <SoftBox>
      <IconButton size="small" onClick={handleOpen}>
        <Icon fontSize="small" color="error">
          delete_icon
        </Icon>
      </IconButton>
      <SoftModal title="Delete User" open={open} handleClose={handleClose} width="20%">
        <SoftBox display="flex" alignItems="center" gap={2}>
          <SoftButton variant="outlined" color="error">
            cancel
          </SoftButton>
          <SoftButton variant="outlined" color="success">
            ok
          </SoftButton>
        </SoftBox>
      </SoftModal>
    </SoftBox>
  );
};

export default UserDelete;
