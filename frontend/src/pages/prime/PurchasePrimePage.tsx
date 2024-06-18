import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { settingStyles } from "../settings/SettingModal";
import { useState } from "react";
import PurchasePaymentCard from "./PurchasePaymentCard";



export type ContentProps = {
  showAliPay: boolean;
  content: string;
};

const PurchasePrimePage = () => {

  const [showMethod, setShowMethod] = useState<ContentProps>({
    showAliPay: false,
    content: "微信支付",
  });

  return (
    <Box
      sx={{
        background: settingStyles.background_layer06,
        display: "flex",
        justifyContent: "center",
        width: {xl:"50%",lg:"60%",md:"70%",sm:"80%",xs:"90%"},
        margin: "10px auto",
        borderRadius: "30px",
      }}
    >
      <Box
        sx={{
          width: {xl:"50%",lg:"60%",md:"70%",sm:"80%",xs:"90%"},
          background: settingStyles.background_white,
          margin: "10px auto",
          borderRadius: "30px",
          color: "black",
        }}
      >
        <Typography
          variant="h6"
          component="h6"
          sx={{ margin: "10px auto", textAlign: "center",fontSize:{lg:"2.5rem",md:"1.5rem",xs:"1rem"}, }}
        >
          述而作会员-年卡
        </Typography>
        {/* payment button */}
        {/* <Box sx={{textAlign:"center",}}>
        <Button onClick={togglePayment} variant='text' sx={{color:"white",background:"black",borderRadius:"20px",margin:"10px",padding:"8px 28px",}}>微信支付</Button>
        <Button onClick={togglePayment} variant='text' sx={{color:"white",background:"black",borderRadius:"20px",margin:"10px",padding:"8px 28px",}}>支付宝支付</Button>
      </Box> */}

        {/* payment card */}
        <Box>
          <Typography sx={{ margin: "10px auto", textAlign: "center",fontSize:{lg:"2rem",md:"1.2rem",xs:"0.8rem"}, }}>
            选择 :{showMethod.content}
          </Typography>
        </Box>

        {/* test select card */}

        <PurchasePaymentCard
          item={[
            { content: "wechatPay", id: 0 },
            { content: "aliPay", id: 1 },
          ]}
          showMethod={showMethod}
          setShowMethod={setShowMethod}
        />
        <Box
          sx={{
            color: "black",
            margin: "20px auto",
            padding: "0px 20px",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: "black", margin: "20px auto",fontSize:{lg:"2rem",md:"1.2rem",xs:"0.8rem"}, }}>
            支付金额 ￥365(每天1元)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PurchasePrimePage;
