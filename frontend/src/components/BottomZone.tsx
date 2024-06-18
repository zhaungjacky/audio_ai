import React from "react";
import UploadIcon from "@mui/icons-material/Upload";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import ModeRoundedIcon from "@mui/icons-material/ModeRounded";
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';

type ModeType = "light" | "dark";
type SiderBarProps = {
  mode: ModeType;
  setMode: React.Dispatch<React.SetStateAction<ModeType>>;
};

const BottomZone = ({ mode, setMode }: SiderBarProps) => {
  return (
    <Container >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          position: "fixed",
          left: "0px",
          bottom: "2%",
          width: "100%",
          paddingBottom:"20px",
          paddingLeft:"20px",
          paddingRight:"20px",
        }}
      >
        <UploadIcon  sx={{
          background:"black",
          color:"white",
          borderRadius: "50%",
          padding: "5px",
          scale:"1.3",
        }}/>
        <MicRoundedIcon fontSize="large" sx={{
          background:"red",
          color:"white",
          borderRadius: "50%",
          padding: "5px",
          marginBottom: "10px",
          scale:"2.3",
        }}/>
        <ModeRoundedIcon  sx={{
          background:"black",
          color:"white",
          borderRadius: "50%",
          padding: "5px",
          
          scale:"1.3",
        }}/>
      </Box>
    </Container>
  );
};

export default BottomZone;
