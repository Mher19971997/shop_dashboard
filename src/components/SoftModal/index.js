import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SoftBox from "components/SoftBox";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

const SoftModal = ({ open, title, width, description, handleClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <SoftBox sx={{ ...style, width }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
        {children}
      </SoftBox>
    </Modal>
  );
};

SoftModal.defaultProps = {
  title: "Modal Title",
  open: false,
  description: "",
  width: "50%",
};

// Typechecking props for the SoftModal
SoftModal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  open: PropTypes.bool,
  width: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default SoftModal;
