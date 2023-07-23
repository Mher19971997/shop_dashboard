import { useCallback, useContext, useEffect } from "react";
import { Divider, MenuItem, MenuList, Popover } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import PropTypes from "prop-types";
import { getProfile } from "http/userApi";
import { useSoftUIController, setUserRole, AuthContext } from "context";

// components
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";

export const AccountPopover = (props) => {
  const [controller, dispatch] = useSoftUIController();
  const authContext = useContext(AuthContext);
  const { anchorEl, onClose, open } = props;
  const navigate = useNavigate();
  // const { isLoading, data: user } = useQuery("userprofile", () => getProfile());

  const handleSignOut = useCallback(() => {
    onClose?.();
    authContext.logout();
  }, [onClose, navigate]);

  // useEffect(() => {
  //   if (!isLoading && user) {
  //     setUserRole(dispatch, user.roles[0]);
  //   }
  // }, [isLoading, user]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200, backgroundColor: "white !important" } }}
    >
      <SoftBox
        sx={{
          py: 0.5,
          px: 1,
        }}
      >
        <SoftTypography variant="overline">Account Email</SoftTypography>
        <SoftTypography color="text.secondary" variant="body2">
          {/* {!isLoading && user.email} */}
        </SoftTypography>
      </SoftBox>
      <Divider />
      <MenuList disablePadding dense>
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
