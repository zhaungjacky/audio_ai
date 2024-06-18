import React from "react";
import UploadIcon from "@mui/icons-material/Upload";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import ModeRoundedIcon from "@mui/icons-material/ModeRounded";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import HandleRecordMount from "./MicRecordPage_new";
import UploadAudioModal from "./UploadAudioModal";
import WriteTextNote from "./WriteTextNote";



type ModeType = "light" | "dark";
type SiderBarProps = {
  mode: ModeType;
  setMode: React.Dispatch<React.SetStateAction<ModeType>>;
};

const BottomZone = ({ mode, setMode }: SiderBarProps) => {
  const [open, setOpen] = React.useState(false); // record modal only
  const [openUploadAudioModal, setOpenUploadAudioModal] = React.useState(false); // upload audio file modal
  const [openWriteNoteModal, setOpenWriteNoteModal] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <Container>
      {/* record function modal */}
      <Box>
        {open ? (
          <HandleRecordMount
            open={open}
            handleClose={handleClose}
            setOpen={setOpen}
          />
        ) : null}
      </Box>
      {/* upload audiofile modal */}
      {openUploadAudioModal && !open && !openWriteNoteModal ? (
        <Box>
          <UploadAudioModal
            open={openUploadAudioModal}
            setOpen={setOpenUploadAudioModal}
          />
        </Box>
      ) : null}
      {/* write text note modal */}
      {openWriteNoteModal && !open && !openUploadAudioModal ? (
        <Box>
          <WriteTextNote
            open={openWriteNoteModal}
            setOpen={setOpenWriteNoteModal}
          />
        </Box>
      ) : null}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          position: "fixed",
          left: "0px",
          bottom: "2%",
          width: "100%",
          paddingBottom: "20px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <IconButton onClick={() => setOpenUploadAudioModal(true)}>
          <UploadIcon
            sx={{
              background: "black",
              color: "white",
              borderRadius: "50%",
              padding: "5px",
              scale: "1.3",
            }}
          />
        </IconButton>

        <IconButton onClick={handleOpen}>
          <MicRoundedIcon
            fontSize="large"
            sx={{
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "5px",
              marginBottom: "10px",
              scale: "2.3",
            }}
          />
        </IconButton>

        <IconButton onClick={()=>setOpenWriteNoteModal(true)}>
          <ModeRoundedIcon
            sx={{
              background: "black",
              color: "white",
              borderRadius: "50%",
              padding: "5px",

              scale: "1.3",
            }}
          />
        </IconButton>
      </Box>
    </Container>
  );
};

export default BottomZone;
