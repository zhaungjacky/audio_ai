import Box from "@mui/material/Box";
import { HeadPage } from "./HeadPage";

import Typography from "@mui/material/Typography";
import { UserComments } from "./UserComments";
import { useAuth } from "../context/AuthContext";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TopIconPage, { SignInModal, SignModalProps } from "./TopIconPage";
import { useState } from "react";

type ownType = Omit<SignModalProps, "open">;

const LoginOrRegisterButton = (props: ownType) => {
  const { setOpen } = props;
  return (
    <Grid container spacing={2} sx={{margin:"10px auto"}}>
      <Grid item xs={12} md={6} sx={{display:"flex",justifyContent:{xs:"center",md:"flex-end",}}}>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          sx={{
            background: "red",
            color: "white",
            width: {md:"260px",xs:"40%"},
            height: {md:"50px",xs:"25px"},
            borderRadius: "40px",
            fontSize:{md: "0.85rem",xs:"0.65rem"},
          }}
        >
          sign up/login
        </Button>
      </Grid>
      <Grid item xs={12} md={6} sx={{display:"flex",justifyContent:{xs:"center",md:"flex-start",}}}>
        <Button
          variant="contained"
          sx={{
            background: "white",
            color: "black",
            width: {md:"260px",xs:"40%"},
            height: {md:"50px",xs:"25px"},
            borderRadius: "40px",
            fontSize:{md: "0.85rem",xs:"0.65rem"},
          }}
        >
          see how it works
        </Button>
      </Grid>
    </Grid>
  );
};

const TopContent = () => {
  const [openSignIn, setOpenSignIn] = useState(false);
  const { user } = useAuth();
  return (
    <>
      {openSignIn ? (
        <SignInModal open={openSignIn} setOpen={setOpenSignIn} />
      ) : null}
      <Typography
        variant="h2"
        component="p"
        sx={{ fontSize: { md: "3rem", xs: "1rem" } }}
      >
        Go from fuzzy thought
        <br /> to clear text.
      </Typography>
      <Typography
        variant="h2"
        component="em"
        sx={{ fontSize: { md: "3rem", xs: "1rem" } }}
      >
        Fast.
      </Typography>
      <Typography sx={{ fontSize: { md: "1rem", xs: "0.6rem" } }}>
        <strong>
          AudioPen transforms messy voice notes into publish-ready text
        </strong>
      </Typography>
      <Typography sx={{ fontSize: { md: "1rem", xs: "0.6rem" } }}>
        Draft articles, memos, emails, and more. In a fraction of the time.
      </Typography>

      {user ? null : <LoginOrRegisterButton setOpen={setOpenSignIn} />}

      <Box sx={{ marginTop: "20px" }}>
        <img
          src="https://a7b19d7a245c07286533d7a21bca9acc.cdn.bubble.io/f1687269973895x341757050325316030/Arrow%204.svg"
          alt="404"
        />
      </Box>
      <Box height="600px"></Box>
      <Box>
        <Typography variant="h2" component="h2">
          Featured on
        </Typography>
      </Box>
    </>
  );
};

const MainPage = () => {
  const { user } = useAuth();
  return (
    <Box>
      {user ? <HeadPage /> : null}
      <TopIconPage />
      <TopContent />
      {/* <TopContent item={user}/> */}
      <UserComments />
    </Box>
  );
};

export default MainPage;
