import React, { useEffect } from "react";
import { IconButton } from "@mui/material";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftModal from "components/SoftModal";
import SoftButton from "components/SoftButton";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "react-query";
import { removeByUuid } from "http/catalogApi";

const UserDelete = ({ uuid }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const queryClient = useQueryClient();
  
  useEffect(() => {}, [uuid]);
  
  const { mutate, isError } = useMutation((uuid) => removeByUuid(uuid), {
    onSuccess: async (response, formData) => {
      queryClient.invalidateQueries("getCatalogs");
    },
    onError: (error) => {
      console.log(error, "errorerror");
    },
  });
  
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
          <SoftButton variant="outlined" color="success" onClick={() => mutate(uuid)}>
            ok
          </SoftButton>
        </SoftBox>
      </SoftModal>
    </SoftBox>
  );
};

UserDelete.propTypes = {
  uuid: PropTypes.string,
};

export default UserDelete;
