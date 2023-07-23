import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSoftUIController } from "context";
import SoftBox from "components/SoftBox";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 10,
  boxShadow: 24,
  p: 4,
};

const QRCodeModal = () => {
  const [controller, dispatch] = useSoftUIController();
  const { qrcode } = controller;
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="overline" component="h2">
            Generate QR Codes for Google Authenticator
          </Typography>
          <SoftBox display="flex" alignItems="center" justifyContent="center">
            <img src={qrcode} />
          </SoftBox>
        </Box>
      </Modal>
    </div>
  );
};

export default QRCodeModal;
