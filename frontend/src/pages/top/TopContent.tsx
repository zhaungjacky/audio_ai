import Typography from "@mui/material/Typography";
import { useAuth } from "../../context/AuthContext";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { SignInModal, SignModalProps } from "./TopIconPage";
import { useState } from "react";
import { Link } from "react-router-dom";

type OwnType = Omit<SignModalProps, "open">;

interface TopContentProps {
  top_0: string;
  top_1: string;
  top_2: string;
  top_3?: string;
  top_4?: string;
  top_5?: string;
}

const LoginOrRegisterButton = (props: OwnType) => {
  const { setOpen } = props;
  return (
    <Grid container spacing={2} sx={{ margin: "6px auto" }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "flex-end" },
        }}
      >
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          sx={{
            background: "red",
            color: "white",
            width: { md: "260px", xs: "200px" },
            height: { md: "50px", xs: "25px" },
            borderRadius: "40px",
            fontSize: { md: "0.85rem", xs: "0.65rem" },
          }}
        >
          注册/登陆
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        <Link to="/workprocess" target="_blank">
          <Button
            variant="contained"
            sx={{
              background: "white",
              color: "black",
              width: { md: "260px", xs: "200px" },
              height: { md: "50px", xs: "25px" },
              borderRadius: "40px",
              fontSize: { md: "0.85rem", xs: "0.65rem" },
            }}
          >
            使用说明
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

const TopContent = ({ top_0, top_1, top_2 }: TopContentProps) => {
  const [openSignIn, setOpenSignIn] = useState(false);
  const { user } = useAuth();
  return (
    <Box>
      {openSignIn ? (
        <SignInModal open={openSignIn} setOpen={setOpenSignIn} />
      ) : null}
      <Box sx={{position:"static",top:"200px"}}>
        <Container>
          <Typography
            variant="h2"
            component="p"
            sx={{ fontSize: { md: "2.6rem", xs: "1rem" }, margin: "10px" }}
          >
            {top_0}
          </Typography>
        </Container>

        <Container>
          <Typography
            sx={{
              fontSize: { md: "1.2rem", xs: "0.6rem", margin: "10px auto" },
            }}
          >
            <strong>{top_1}</strong>
          </Typography>
        </Container>

        <Container>
          <Typography
            sx={{ fontSize: { md: "1rem", xs: "0.6rem", margin: "10px auto" } }}
          >
            {top_2}
          </Typography>
        </Container>

        <Container>
          {user ? null : <LoginOrRegisterButton setOpen={setOpenSignIn} />}
        </Container>
      </Box>
    </Box>
  );
};

export default TopContent;
