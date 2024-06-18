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

// type MainProps = {

//   content:string,
//   id:number,

// };

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
            写作风格
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
            描述一下您想述而作写作的风格
          </Typography>
          <TextField
            sx={{ width: "80%",background:settingStyles.background_layer02, }}
            disabled={!isStyle}
            inputProps={{
              style:{color:"white"}
            }}
            placeholder="e.g.:像鲁迅一样写作"
          ></TextField>
          <Button size="small" disabled={!isStyle} sx={{color:"white",margin:"5px auto",background:settingStyles.buttonBackground,borderRadius:"20px",}}>
            管理风格
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
            输出长度
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
          <Typography color={lengthColor} sx={{fontFamily: settingStyles.fontFamily,marginTop:"10px",}} >述而作的输出将是中等长度</Typography>
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
          <Tab label="初级" {...a11yProps(0)} sx={{ color: "white",fontFamily: settingStyles.fontFamily, }} />
          <Tab label="中级" {...a11yProps(1)} sx={{ color: "white" ,fontFamily: settingStyles.fontFamily,}} />
          <Tab label="高级" {...a11yProps(2)} sx={{ color: "white" ,fontFamily: settingStyles.fontFamily,}} />
        </Tabs>
      </Box>
      {/* Low */}
      <CustomTabPanel value={value} index={0}>
        <WriteLevelCard
          title={"*此选项是会员功能*"}
          detail={
            "述而作将为您的原始脚本创建一个经过轻度整理的版本。书写风格和长度设置将被忽略"
          }
          isStyle={false}
          isLength={false}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <WriteLevelCard
          title={"*此选项是会员功能*"}
          detail={
            "述而作将保留您的语音笔记的结构和词汇，同时以您选择的风格重写它，但忽略长度设置"
          }
          isStyle={true}
          isLength={false}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <WriteLevelCard
          title={""}
          detail={
            "您的语音笔记将以您选择的风格和长度重写。如果需要的话，所述而作可以重组其内容"
          }
          isStyle={true}
          isLength={true}
        />
      </CustomTabPanel>
    </Box>
  );
};

export default RewriteLevel;
