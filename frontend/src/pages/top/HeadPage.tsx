import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MicIcon from "@mui/icons-material/Mic";
import { settingStyles } from "../settings/SettingModal";
import { Link } from "react-router-dom";

export interface HeadPageProps {
  title: string;
}

export const HeadPage = ({ title }: HeadPageProps) => {
  return (
    <Box
      sx={{
        // background: "rgba(0,0,0,0.8)",
        display: "flex",
        // display:{md:"flex",sm:"none",xs:"none"},
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        padding: "10px",
        // opacity:0.8,
      }}
      className="headpage-card"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: settingStyles.background_body,
          borderRadius: "30px",
          padding: "8px 28px",
          gap: "6px",
        }}
      >
        <MicIcon
          sx={{
            color: "red",
            fontSize: { lg: "26px", md: "20px", sm: "16px" },
          }}
        />
        <Link to="/">
          <Button variant="text" sx={{"&:hover":{background:"none"}}}>
            <Typography
              variant="h5"
              sx={{
                color: "black",
                fontSize: { lg: "1.6rem", md: "1.2rem", xs: "0.8rem" },
              }}
            >
              {title}
            </Typography>
          </Button>
        </Link>
      </Box>
      {/* <RedLine width="11%" height="5px" background="red" /> */}
    </Box>
  );
};
