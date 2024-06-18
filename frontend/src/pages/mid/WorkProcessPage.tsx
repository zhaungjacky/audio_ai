import React from "react";
import useFetch from "../../hook/useFetch";
import { UserCasesTypes } from "./UserCases";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import { Link } from "react-router-dom";

const WorkProcessPage = () => {
  const [initData, setInitData] = React.useState([] as UserCasesTypes[]);

  const { data } = useFetch<UserCasesTypes[]>("/api/workprocess", false);

  React.useEffect(() => {
    if (data) {
      setInitData(data);
      // console.log(data);
    }
  }, [data]);
  const flowDireactions = ["row-reverse", "row", "row-reverse"];
  const videoAddress = [
    "/static/images/step-1.mp4",
    "/static/images/step-2.mp4",
    "/static/images/step-3.mp4",
  ];

  const textAligns = ["left", "right", "left"];

  return (
    <Box sx={{ margin: "30px auto", padding: "20px", width: "80%" }}>
            {/* logo click navigator to main page */}
            <Box sx={{textAlign:"center",}}>
        <Link to="/">
          <IconButton>
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
        </Link>
      </Box>
      <Box>
        <Typography variant="h3" sx={{ margin: "30px auto" }}>
          述而作是如何工作的？
        </Typography>
      </Box>
      {initData.map((item, index) => (
        <Box
          sx={{
            display: {
              sm: "block",
              md: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: `${flowDireactions[index]}`,
              rowGap: "50px",
            },
          }}
          key={item.id}
        >
          <Box sx={{ width: { sm: "80%", md: "50%" },padding:"10px 20px" }}>
            <Typography
              variant="h5"
              color="primary"
              sx={{ textAlign:{ md:`${textAligns[index]}`,sm:"left"}, marginBottom: "20px" }}
            >
              {item.id}.{item.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ textAlign: { md:`${textAligns[index]}`,sm:"left"} }}
            >
              {item.context}
            </Typography>
          </Box>
          <Box sx={{ width: { sm: "90%", md: "50%",padding:"10px 20px" }, borderRadius: "20px" }}>
            {" "}
            <video
              className="step-video"
              src={videoAddress[index]}
              autoPlay
              loop
              muted
              playsInline
              width="90%"
            ></video>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default WorkProcessPage;
