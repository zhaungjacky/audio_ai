import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <Box
        sx={{
          display: { md: "flex", xs: "block" },
          justifyContent: "space-between",
          alignItems: "center",
          margin: "5px auto",
          padding: "5px 20px 100px 20px",
          // position: "relative",
          // left: "0%",
          // bottom: "5%",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              justifyContent: { md: "flex-start", xs: "center" },
              alignItems: "center",
            }}
          >
            &copy;易谙科技{" "}
            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderColor: "rgba(0,0,0,0.8)" }}
            />
            <Box >
              述而作
              <sup>
                <small className="footer-tm">TM</small>
              </sup>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: { md: "flex-end", xs: "center" },
            alignItems: "center",
            gap: { md: "15px", xs: "5px" },
            // margin:{md:"auto",xs:"10px auto"}
          }}
        >
          <Link to="/faqs" target="_blank">
            <Button sx={{ color: "black" }}>FAQs</Button>
          </Link>
          <Link to="/provicypolicy" target="_blank">
            <Button sx={{ color: "black" }}>隐私政策</Button>
          </Link>
          <Link to="/workprocess" target="_blank">
            <Button sx={{ color: "black" }}>工作原理</Button>
          </Link>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
