import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import EditIcon from "@mui/icons-material/Edit";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";
import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";
import CallToActionIcon from '@mui/icons-material/CallToAction';
import AlbumIcon from '@mui/icons-material/Album';
import ArticleIcon from '@mui/icons-material/Article';
import useFetch from "../../hook/useFetch";
import { settingStyles } from "../settings/SettingModal";

const CasesIcon: { id: number; icon: any }[] = [
  { id: 0, icon: <LightbulbIcon color="primary" /> },
  { id: 1, icon: <EditIcon color="primary" /> },
  { id: 2, icon: <AutoStoriesIcon color="primary" /> },
  { id: 3, icon: <SettingsVoiceIcon color="primary" /> },
  { id: 4, icon: <GroupsIcon color="primary" /> },
  { id: 5, icon: <SchoolIcon color="primary" /> },
  { id: 6, icon: <CallToActionIcon color="primary" /> },
  { id: 7, icon: <AlbumIcon color="primary" /> },
  { id: 8, icon: <ArticleIcon color="primary" /> },
];

export type UserCasesTypes = {
  id: number;
  title: string;
  context: string;
};

export interface MidContent {
  mid: string;
}

const UserCases = ({ mid }: MidContent) => {
  const [initData, setInitData] = React.useState([] as UserCasesTypes[]);

  const { data } = useFetch<UserCasesTypes[]>("/api/usercases", false);

  React.useEffect(() => {
    if (data) {
      setInitData(data);
    }
  }, [data]);

  if (initData) {
    return (
      <Box
        sx={{
          margin: "50px auto 10px",
          width: { lg: "60%", md: "70%", xs: "85%" },
        }}
      >
        <Container sx={{paddingY:{md:"20px",sm:"10px"},}}>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              margin: {
                md: "20px auto",
                sm: "10px auto",
                color: settingStyles.background_black,
                fontSize: { lg: "2rem", md: "1.2rem", sm: "0.8rem" },
                
              },
            }}
          >
            {mid}
          </Typography>
        </Container>
        <Grid container spacing={2}>
          {initData?.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Paper
                sx={{
                  minHeight: { lg: "180px" },
                  padding: "6px 12px",
                  borderRadius: "16px",
                }}
                elevation={4}
              >
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "left",
                    margin: "8px 10px",
                    color: settingStyles.background_black,
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "10px",
                    fontSize:{lg:"1.2rem",md:"1rem",xs:"0.8rem"}
                  }}
                >
                  {CasesIcon[index]?.icon}
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textAlign: "left", margin: "8px 10px" ,fontSize:{lg:"0.9rem",md:"0.8rem",xs:"0.6rem"}}}
                >
                  {item.context}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  } else {
    return <>loading...</>;
  }
};

export default UserCases;
