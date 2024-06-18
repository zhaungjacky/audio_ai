import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import {settingStyles} from "./SettingModal";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface WriteLevelCardProps {
  title: string;
  detail: string;
  isStyle: boolean;
  isLength: boolean;
}

function WriteLevelCard(props: WriteLevelCardProps) {
  const { title, detail, isStyle, isLength } = props;
  const styleColor= isStyle ? "white":"grey";
  const lengthColor= isLength ? "white":"grey";
  return (
    <Grid container spacing={3}>
      <Grid item>
        <Typography sx={{ fontSize: "1rem",fontFamily: settingStyles.fontFamily, }}>{title}</Typography>
        <Typography sx={{ fontSize: "0.8rem",fontFamily: settingStyles.fontFamily, }}>{detail}</Typography>
      </Grid>
      <Grid item md={6} xs={12}>
        <Paper
          elevation={2}
          sx={{
            background: "rgba(61, 63, 84, 0.7)",
            width: "100%",
            color: "white",
            minHeight: "220px",
            borderRadius:"20px",
            padding:"10px",
          }}
        >
          <Typography
            variant="h6"
            color={styleColor}
            sx={{ margin: { md: "10px auto", xs: "5px auto" }, fontSize:{md:"1.2rem",xs:"0.8rem"},fontFamily: settingStyles.fontFamily,}}
          >
            Writing Style
          </Typography>
          <Typography
          color={styleColor}
            sx={{
              margin: {
                md: "10px auto",
                xs: "5px auto",
                fontSzie: { md: "1rem", xs: "0.3rem" },
                fontFamily: settingStyles.fontFamily,
              },
            }}
          >
            Describe a style you want AudioPen to write in.
          </Typography>
          <TextField
            sx={{ width: "80%",background:settingStyles.background_layer02, }}
            disabled={!isStyle}
            placeholder="e.g.:Write like Morgan Housel"
          ></TextField>
          <Button size="small" disabled={!isStyle} sx={{color:"white",margin:"5px auto",background:settingStyles.buttonBackground,borderRadius:"20px",}}>
            manage styles
          </Button>
        </Paper>
      </Grid>
      <Grid item md={6} xs={12}>
        <Paper
          elevation={2}
          sx={{
            background: "rgba(61, 63, 84, 0.7)",
            width: "100%",
            color: "white",
            minHeight: "220px",
            fontFamily: settingStyles.fontFamily,
            borderRadius:"20px",
            padding:"10px",
          }}
        >
          <Typography
            variant="h6"
            color={lengthColor}
            sx={{ margin: { md: "10px auto", xs: "5px auto" },fontSize:{md:"1.2rem",xs:"0.8rem"},fontFamily: settingStyles.fontFamily, }}
          >
            Output Length
          </Typography>
          <Slider
            disabled={!isLength}
            defaultValue={50}
            min={0}
            step={50}
            max={100}
            valueLabelDisplay="auto"
            aria-labelledby="non-linear-slider"
          />
          <Typography color={lengthColor} sx={{fontFamily: settingStyles.fontFamily,marginTop:"10px",}} >AudioPen's output will be of medium length.</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

const RewriteLevel = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", color: "white" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            color: "white",
            display: "flex",
            justifyContent: "center",
            fontFamily: settingStyles.fontFamily,
          }}
        >
          <Tab label="Low" {...a11yProps(0)} sx={{ color: "white",fontFamily: settingStyles.fontFamily, }} />
          <Tab label="Medium" {...a11yProps(1)} sx={{ color: "white" ,fontFamily: settingStyles.fontFamily,}} />
          <Tab label="High" {...a11yProps(2)} sx={{ color: "white" ,fontFamily: settingStyles.fontFamily,}} />
        </Tabs>
      </Box>
      {/* Low */}
      <CustomTabPanel value={value} index={0}>
        <WriteLevelCard
          title={"*This option is a Prime feature*"}
          detail={
            "AudioPen will create a lightly cleaned up version of your originaltranscript. Writing style and length settings will be ignored."
          }
          isStyle={false}
          isLength={false}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <WriteLevelCard
          title={"*This option is a Prime feature*"}
          detail={
            "AudioPen will retain your voice note's structure and vocabulary, whilerewriting it in your chosen style, but ignoring length settings."
          }
          isStyle={true}
          isLength={false}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <WriteLevelCard
          title={""}
          detail={
            "Your voice note will be rewritten in the style and length that you'vechosen. AudioPen may restructure its contents if needed."
          }
          isStyle={true}
          isLength={true}
        />
      </CustomTabPanel>
    </Box>
  );
};

export default RewriteLevel;
