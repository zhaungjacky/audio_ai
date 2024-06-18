import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { settingStyles } from "../pages/settings/SettingModal";

const PageNotFound = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState<number>(3);
  const interValRef = useRef<number | null>(null);

  const stopTimer = () => {
    if (interValRef.current) window.clearInterval(interValRef.current);
  };

  useEffect(() => {
    interValRef.current = window.setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    if (timer <= 0) navigate("/");
    return () => {
      stopTimer();
    };
  }, [navigate, timer]);

  return (
    <Box
      sx={{
        mt: 3,
        width: "100%",
        height: "90vh",
        background: settingStyles.background_layer02,
        color:"white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        404 Page Not Found
      </Typography>
      <Typography variant="h6">{timer} 秒后返回主页</Typography>
    </Box>
  );
};

export default PageNotFound;
