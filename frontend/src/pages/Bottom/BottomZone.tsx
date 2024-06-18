import React from "react";
import UploadIcon from "@mui/icons-material/Upload";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import ModeRoundedIcon from "@mui/icons-material/ModeRounded";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import HandleRecordMount from "../microphone/MicRecordPage_tn";
import UploadAudioModal from "./upload/UploadAudioModal";
import WriteTextNote from "../prime/WriteTextNote";
import { UserStatusType } from "../../constants/props";
import { useAuth } from "../../context/AuthContext";
import useFetch from "../../hook/useFetch";

type ModeType = "light" | "dark";

type SiderBarProps = {
  mode: ModeType;
  setMode: React.Dispatch<React.SetStateAction<ModeType>>;
};

const BottomZone = ({ mode, setMode }: SiderBarProps) => {
  const {user} = useAuth();
  const [open, setOpen] = React.useState(false); // record modal only
  const [openUploadAudioModal, setOpenUploadAudioModal] = React.useState(false); // upload audio file modal
  const [openWriteNoteModal, setOpenWriteNoteModal] = React.useState(false)
  // get user_status from server determain wheather he can add tags or other
  const { data: user_status } = useFetch<UserStatusType>(
    "/api/user-status/" + user?.user_id,
    true
  );


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
      {/* {openUploadAudioModal && !open && !openWriteNoteModal && user_status ? ( */}
      {openUploadAudioModal  && user_status ? (

          <Box>
            <UploadAudioModal
            open={openUploadAudioModal}
            setOpen={setOpenUploadAudioModal}
            user_status={user_status}
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
          paddingX: "20px",
          zIndex:100,
        }}
      >
        
        <Tooltip title="上传" placement="right" sx={{backgroundColor:"white"}}>
          <IconButton onClick={() => setOpenUploadAudioModal(true)} id="uploadId">
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
        </Tooltip>

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
              zIndex:"100",
            }}
          />
        </IconButton>

        <Tooltip title="会员" placement="left">
          <IconButton onClick={()=>setOpenWriteNoteModal(true)} id="rewriteId">
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
        </Tooltip>
      </Box>
    </Container>
  );
};

export default BottomZone;
