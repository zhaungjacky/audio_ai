import * as React from "react";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { settingStyles } from "../settings/SettingModal";
import useFetch from "../../hook/useFetch";
import { MidContent, UserCasesTypes } from "./UserCases";

const FAQsPage = ({mid}:MidContent) => {
  const { data } = useFetch<UserCasesTypes[]>("/api/faqs",false);
  const [initData, setInitData] = React.useState([] as UserCasesTypes[]);

  React.useEffect(() => {
    if (data) {
      setInitData(data);
    }
  }, [data]);

  if (!initData) {
    return <>loading...</>;
  }

  return (
    <Box
      sx={{
        textAlign: "center",
        width: { lg: "60%", md: "70%", sm: "90%" },
        margin: "50px auto 20px",
      }}
      id="faqs"
    >
      <Box>
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
      </Box>
      <Box
        sx={{
          width: "90%",
          // display: "flex",
          margin: "10px auto",
          // justifyContent: "center",
        }}
      >
        {initData.map((item, index) => (
          <Accordion key={item.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="subtitle1" sx={{textAlign:"left",fontSize:{lg:"1.1rem",md:"1rem",xs:"0.8rem"}}}>{item.id}.{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{textAlign:"left",fontSize:{lg:"0.9rem",md:"0.8rem",xs:"0.7rem"}}}>
                {item.context}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default FAQsPage;
