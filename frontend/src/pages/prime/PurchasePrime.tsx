import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import PurchasePrimePage from "./PurchasePrimePage";

const PurchasePrime = () => {
  return (
    <Box >
      <Box sx={{position:"absolute",top:"10px",right:"10%",}}>
        <Link to="/">
          <IconButton color="primary" size="small" >
            {" "}
            <CloseIcon />{" "}
          </IconButton>
        </Link>
      </Box>
      <PurchasePrimePage />
    </Box>
  );
};

export default PurchasePrime;
