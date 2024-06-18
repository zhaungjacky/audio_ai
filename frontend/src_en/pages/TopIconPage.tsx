import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useAuth } from "../context/AuthContext";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LoginPage from "./LoginPage";
import SettingModal from "./SettingModal";

const noUserStyle = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: 600, xs: "90%" },
  bgcolor: "background.paper",
  border: "0px",
  borderRadius: { md: "40px", xs: "20px" },
  boxShadow: 24,
  p: 0,
};

export type SignModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openSignIn?: boolean;
  setOpenSignIn?: React.Dispatch<React.SetStateAction<boolean>>;
};

// user sign in menu
function AccountModal(props: SignModalProps) {
  const { open, setOpen, setOpenSignIn } = props;
  const { user, logoutUser } = useAuth();
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ opacity: 1, backgroundColr: "rgba(61, 63, 84, 0.3)" }}
      >
        {!user ? (
          <Box sx={noUserStyle}>
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              textAlign="center"
              paddingTop="30px"
            >
              Account
            </Typography>
            <Typography variant="h3" component="div"></Typography>
            <Typography
              id="modal-modal-description"
              sx={{
                mt: 2,
                textAlign: "center",
                padding: "10px 20px 40px 20px ",
                fontSize: "1.5rem",
              }}
            >
              You aren't currently signed in.
            </Typography>
            <Box>
              <Button
                onClick={() => {
                  setOpenSignIn!(true);
                  setOpen(false);
                }}
                sx={{
                  background: "red",
                  color: "white",
                  borderRadius: "50px",
                  width: "160px",
                  // scale: "2",
                  position: "absolute",
                  bottom: "-20%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  margin: 0,
                  paddding: 0,
                  "&hover": {
                    background: "red",
                    color: "white",
                  },
                  // bottom: "-20px",
                }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        ) : (
          <Grid
            container
            spacing={1}
            sx={{
              // position: {md:"absolute",xs:"none"},
              // top: {md:"50%",xs:"none"},
              // left: {md:"50%",xs:"none"},
              // transform: {md:"translate(-50%, -50%)",xs:"none"},
              border: "0px",
              margin: "20px auto",
              height: "100%",
              overflow: "scroll",
            }}
          >
            {/* account info */}
            <Grid
              item
              md={12}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "20px",
                position:"fixed",
                top:"5%",
                right:"10%",
              }}
            >
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon sx={{ background: "white", borderRadius: "50%" }} />
              </IconButton>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  background: "rgba(247, 230, 230, 1)",
                  width: { md: "50%", xs: "90%" },
                  textAlign: "center",
                  borderRadius: "20px",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "monospace",
                    padding: "8px",
                    fontSize: { xs: "0.8rem", md: "1rem" },
                  }}
                  variant="h6"
                  component="h4"
                >
                  Account
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "monospace",
                    fontSize: { xs: "0.8rem", md: "1rem" },
                  }}
                >
                  <strong>email</strong>:{user.username}
                  <Button
                    variant="text"
                    onClick={logoutUser}
                    sx={{
                      color: "black",
                      fontSize: { xs: "0.8rem", md: "1rem" },
                    }}
                  >
                    {"("}logoout{")"}
                  </Button>
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "monospace",
                    fontSize: { xs: "0.8rem", md: "1rem" },
                  }}
                >
                  <strong>saved notes</strong>:{user.user_id}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "monospace",
                    fontSize: { xs: "0.8rem", md: "1rem" },
                  }}
                >
                  <strong>acount type</strong>:{user.user_id}
                </Typography>
                <Box>
                  <Button
                    variant="contained"
                    sx={{
                      background: "black",
                      color: "white",
                      borderRadius: "20px",
                      margin: "20px auto",
                      padding: "8px 15px",
                      fontSize: { xs: "0.5rem", md: "1rem" },
                    }}
                    size="small"
                  >
                    Get AudioPen Prime
                  </Button>{" "}
                </Box>
              </Box>
            </Grid>

            {/* trouble shoot */}
            <Grid
              item
              md={12}
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  background: "rgba(247, 230, 230, 1)",
                  width: { md: "50%", xs: "90%" },
                  textAlign: "center",
                  borderRadius: "20px",
                  marginTop: { md: "20px", xs: "5px" },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "monospace",
                    padding: "8px 0 0 0",
                    fontSize: { xs: "0.8rem", md: "1rem" },
                  }}
                  variant="h6"
                  component="h4"
                >
                  Troubleshoot
                </Typography>
                <Box>
                  <TextField
                    id="outlined-multiline-static"
                    label="trouble shoot"
                    multiline
                    rows={4}
                    placeholder="Is something not working the way it should?Let me konw here."
                    sx={{
                      width: "80%",
                      opacity: "0.5",
                      fontSize: { xs: "0.5rem", md: "1rem" },
                    }}
                  />
                </Box>
                <Button
                  sx={{
                    positon: "absolute",
                    background: "rgba(247, 230, 230, 1)",
                    transform: "translate(0%,-50%)",
                    border: "1px solid grey",
                    borderRadius: "20px",
                    width: "10%",
                    color: "black",
                    fontSize: { xs: "0.6rem", md: "1rem" },
                  }}
                >
                  Send
                </Button>
              </Box>
            </Grid>

            {/* prime zone */}

            <Grid
              item
              md={6}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: { md: "flex-end", xs: "center" },
              }}
            >
              <Box
                sx={{
                  background: "rgba(0,0,0,0.8)",
                  color: "white",
                  width: { md: "50%", xs: "90%" },
                  // position: "absolute",
                  // left: "0px",
                  // transform: "translate(0%, 50%)",
                  padding: "10px 20px",
                  borderRadius: "20px",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: { md: "1.2rem", xs: "0.6rem" } }}
                >
                  Become an Affiliate
                </Typography>
                <Box
                  sx={{
                    width: "20%",
                    height: { md: "5px", xs: "2px" },
                    background: "red",
                    borderRadius: "2px",
                    margin: "0px auto",
                  }}
                ></Box>
                <Typography
                  sx={{
                    fontSize: { md: "0.8rem", xs: "0.6rem" },
                    margin: { md: "20px auto", xs: "5px auto" },
                  }}
                >
                  Earn up to 35% of every AudioPen Prime conversion you drive by
                  sharing your unique affiliate link.
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    background: "white",
                    color: "black",
                    borderRadius: "20px",
                    marginBottom: "10px",
                    fontSize: { md: "0.8rem", xs: "0.6rem" },
                  }}
                >
                  View Instructions
                </Button>
              </Box>
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: { md: "flex-start", xs: "center" },
              }}
            >
              <Box
                sx={{
                  background: "rgba(255,255,255,0.8)",
                  color: "black",
                  width: { md: "50%", xs: "90%" },
                  padding: "10px 20px",
                  borderRadius: "20px",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: { md: "1.2rem", xs: "0.6rem" } }}
                >
                  Gift AudioPen Prime
                </Typography>
                <Box
                  sx={{
                    width: "20%",
                    height: { md: "5px", xs: "2px" },
                    background: "red",
                    borderRadius: "2px",
                    margin: "0px auto",
                    border: "1px solid transparent",
                  }}
                ></Box>
                <Typography
                  sx={{
                    fontSize: { md: "0.8rem", xs: "0.6rem" },
                    margin: { md: "20px auto", xs: "5px auto" },
                  }}
                >
                  If you know someone who would like AudioPen Prime, it's
                  extremely simple to gift them lifetime access.
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    background: "white",
                    color: "black",
                    borderRadius: "20px",
                    marginBottom: "10px",
                    border: "1px solid rgba(0,0,0,0.5)",
                    fontSize: { md: "0.8rem", xs: "0.6rem" },
                  }}
                >
                  Gift AudioPen Prime
                </Button>
              </Box>
            </Grid>
            <Grid item md={12} xs={12} spacing={1}>
              <Box
                sx={{
                  background: "rgba(0,0,0,0.8)",
                  color: "white",
                  textAlign: "center",
                  margin: { md: "20px auto", xs: "0px auto" },
                  borderRadius: "20px",
                  width: { md: "50%", xs: "90%" },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    padding: { md: "20px", xs: "5px" },
                    fontSize: { md: "1.6rem", xs: "0.8rem" },
                  }}
                >
                  Links
                </Typography>
                <Grid
                  container
                  spacing={1}
                  sx={{ paddingBottom: { md: "10px", xs: "5px" } }}
                >
                  <Grid item md={4} xs={12}>
                    <Button
                      variant="outlined"
                      sx={{
                        color: "white",
                        border: "1px solid white",
                        borderRadius: "20px",
                        fontSize: { md: "1rem", xs: "0.5rem" },
                        width: "95%",
                      }}
                    >
                      Watch a demo
                    </Button>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Button
                      variant="outlined"
                      sx={{
                        color: "white",
                        border: "1px solid white",
                        borderRadius: "20px",
                        fontSize: { md: "1rem", xs: "0.5rem" },
                        width: "95%",
                      }}
                    >
                      Read FAQs
                    </Button>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Button
                      variant="outlined"
                      sx={{
                        color: "white",
                        border: "1px solid white",
                        borderRadius: "20px",
                        width: "95%",
                        fontSize: { md: "1rem", xs: "0.5rem" },
                      }}
                    >
                      Delete Account
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        )}
      </Modal>
    </div>
  );
}

export function SignInModal(props: SignModalProps) {
  const { open, setOpen } = props;
  const { user } = useAuth();
  React.useEffect(() => {
    if (user) {
      setOpen(false);
    }
  }, [setOpen, user]);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ background: "rgba(255, 255, 255, 0.8)" }}
    >
      <Box
        sx={{
          background: "white",
          width: { md: "60%", xs: "95%" },
          margin: "20px auto",
          borderRadius: "40px",
        }}
      >
        <LoginPage />
      </Box>
    </Modal>
  );
}

const TopIconPage = () => {
  const [open, setOpen] = React.useState(false);
  const [openSignIn, setOpenSignIn] = React.useState(false);
  const [openSettingModal, setOpenSettingModal] = React.useState(false);

  const handleOpen = () => setOpen(true);
  return (
    <Box>
      {/* account modal */}
      {open ? (
        <AccountModal
          open={open}
          setOpen={setOpen}
          setOpenSignIn={setOpenSignIn}
        />
      ) : null}

      {openSignIn && !open && !openSettingModal ? (
        <SignInModal open={openSignIn} setOpen={setOpenSignIn} />
      ) : null}

      {/* setting modal */}
      {openSettingModal && !open && !openSignIn ? (
        <SettingModal open={openSettingModal} setOpen={setOpenSettingModal} />
      ) : null}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 30px 10px 15px",
          marginRight: "5px",
        }}
      >
        <IconButton
          sx={{
            "&hover": {
              background: "red",
            },
          }}
          onClick={handleOpen}
        >
          <PersonIcon
            sx={{
              background: "black",
              color: "white",
              borderRadius: "50%",
              padding: "5px",
              scale: "1.3",
            }}
          />
        </IconButton>
        <Typography
          variant="h5"
          component="h3"
          sx={{ borderBottom: "3px solid red" }}
        >
          AudioPen
        </Typography>
        <IconButton onClick={() => setOpenSettingModal(true)}>
          <SettingsIcon
            sx={{
              background: "black",
              color: "white",
              borderRadius: "50%",
              padding: "5px",
              scale: "1.3",
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopIconPage;
