import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { settingStyles } from "../settings/SettingModal";
import { ContentProps } from "./PurchasePrimePage";

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

interface MainProps {
  item: {
    content: string;
    id: number;
  }[];
  showMethod: ContentProps;
  setShowMethod: React.Dispatch<React.SetStateAction<ContentProps>>;
}

const PurchasePaymentCard = (props: MainProps) => {
  const { item, showMethod, setShowMethod } = props;
  const [value, setValue] = React.useState(0);

  const togglePayment = () => {
    if (!showMethod.showAliPay) {
      setShowMethod({ showAliPay: true, content: "支付宝支付" });
    } else {
      setShowMethod({ showAliPay: false, content: "微信支付" });
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    togglePayment();
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
          <Tab
            label={item[0].content}
            {...a11yProps(item[0].id)}
            sx={{
              color: settingStyles.background_black,
              fontFamily: settingStyles.fontFamily,
            }}
          />
          <Tab
            label={item[1].content}
            {...a11yProps(item[1].id)}
            sx={{
              color: settingStyles.background_black,
              fontFamily: settingStyles.fontFamily,
            }}
          />
        </Tabs>
      </Box>

      {/* wechat QR code */}
      <CustomTabPanel value={value} index={item[0].id}>
        <Typography sx={{ color: settingStyles.background_black,textAlign:"center", }}>
          WeChat QR code
        </Typography>
        <Box
          sx={{
            width: "166px",
            height: "166px",
            background: settingStyles.background_layer01,
            margin: "20px auto",
            display: "flex",
            alignItems: "center",
            justifyContent:"center",
            borderRadius: "16px",            
          }}
        >
          <Typography sx={{ padding: "20px",fontSize:{lg:"1.2rem",md:"1rem",xs:"0.8rem"}, }}>
            reserve for WechatPay QR code
          </Typography>
        </Box>

      </CustomTabPanel>

      {/* alipay QR code */}
      <CustomTabPanel value={value} index={item[1].id}>
      <Typography sx={{ color: settingStyles.background_black,textAlign:"center", }}>
          AliPay QR code
        </Typography>
        <Box
          sx={{
            width: "166px",
            height: "166px",
            background: settingStyles.background_layer03,
            margin: "20px auto",
            display: "flex",
            alignItems: "center",
            borderRadius: "16px",
          }}
        >
          <Typography sx={{ padding: "20px",fontSize:{lg:"1.2rem",md:"1rem",xs:"0.8rem"}, }}>
            reserve for AliPay QR code
          </Typography>
        </Box>
      </CustomTabPanel>
    </Box>
  );
};

export default PurchasePaymentCard;
