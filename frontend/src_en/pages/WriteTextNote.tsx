import Modal from "@mui/material/Modal";
import { SignModalProps } from "./TopIconPage";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const WriteTextNote = (props: SignModalProps) => {
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
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "0px",
            borderRadius: "20px",
            width: {md:"35vw",xs:"90%"},
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" sx={{ margin: "20px auto 10px" }}>
            Rewrite a text note
          </Typography>
          <Box
            sx={{
              width: "5%",
              height: "5px",
              background: "red",
              borderRadius: "2px",
              margin: "0px auto",
            }}
          ></Box>
          <Typography sx={{ padding: "10px" }}>
            This feature is limited to AudioPen Prime members.
          </Typography>
          <Button
            sx={{
              background: "rgba(255,92,10,1)",
              color: "white",
              borderRadius: "20px",
              margin: "20px auto 40px",
              fontSize:{md:"1rem",xs:"0.6rem"}
            }}
          >
            Explore AudioPen Prime
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default WriteTextNote;
