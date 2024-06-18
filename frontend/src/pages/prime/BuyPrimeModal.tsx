import React from "react";
import { SignModalProps } from "../top/TopIconPage";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { settingStyles } from "../settings/SettingModal";
import IconButton from "@mui/material/IconButton";
import PurchasePrimePage from "./PurchasePrimePage";
import CloseIcon from "@mui/icons-material/Close";

const BuyPrimeModal = (props: SignModalProps) => {
  const { open, setOpen } = props;
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            background: settingStyles.background_layer06,
            display: "flex",
            justifyContent: "center",
            width: "80%",
            margin: "10px auto",
            borderRadius: "30px",
          }}
        >
          <Box sx={{ position: "absolute", top: "20px ", right: "11%" }}>
            <IconButton color="primary" size="small" onClick={()=>setOpen(false)}>
              {" "}
              <CloseIcon />{" "}
            </IconButton>
          </Box>
          <PurchasePrimePage />
        </Box>
      </Modal>
    </div>
  );
};

export default BuyPrimeModal;
