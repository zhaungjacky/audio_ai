import Modal from "@mui/material/Modal";
import { SignModalProps } from "./TopIconPage";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import RewriteLevel from "./RewriteLevel";

const languages: string[] = ["chinese", "japanese", "mandrain", "catonneese"];
export const settingStyles = {
  background_main: "rgba(61, 63, 84, 1)",
  background_layer01: "rgba(65, 65, 85, 0.8)",
  background_layer02: "rgba(70, 70, 90, 0.8)",
  background_layer03: "rgba(76, 76, 96, 1)",
  buttonBackground: "rgba(70, 70, 90, 0.8)",
  inputBackground: "rgba(70, 70, 90, 0.8)",
  textareaBackground: "rgba(70, 70, 90, 0.8)",
  fontFamily: "monospace,sans-serif",
};

const SettingModal = (props: SignModalProps) => {
  const { open, setOpen } = props;
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            // position: "absolute",
            // top: "50%",
            // left: "50%",
            // transform: "translate(-50%, -50%)",
            border: "0px",
            // borderRadius: "20px",
            width: "100vw",
            height: "100vh",
            background: settingStyles.background_main,
            color: "white",
            textAlign: "center",
            overflow: "scroll",
          }}
        >
          {/* close button */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              position:"fixed",
              top:"2%",
              right:"5%",
            }}
          >
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon
                sx={{
                  color: "white",
                  border: "1px solid white",
                  borderRadius: "50%",
                  position: "relative",
                  top: { md: "50px", xs: "30px" },
                  right: { md: "50px", xs: "10px" },
                }}
              />
            </IconButton>
          </Box>

          {/* title-settings */}
          <Typography
            variant="h4"
            sx={{
              margin: { md: "20px auto 10px", xs: "10px auto" },
              fontFamily: "monospace,sans-serif",
              fontSize: { md: "2rem", xs: "1rem" },
            }}
          >
            Settings
          </Typography>
          {/* button line-red */}
          <Box
            sx={{
              width: "2%",
              height: "5px",
              background: "red",
              borderRadius: "2px",
              margin: "0px auto",
            }}
          ></Box>

          {/* input output language */}

          <Grid
            container
            spacing={3}
            sx={{
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            {/* input language */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: { md: "flex-end", xs: "center" },
              }}
            >
              <Paper
                elevation={2}
                sx={{
                  background: settingStyles.background_layer01,
                  width: { md: "50%", xs: "80%" },
                  color: "white",
                  borderRadius: "15px",
                  padding: "15px 20px 20px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: settingStyles.fontFamily,
                    fontSize: { md: "1.5rem", xs: "1rem" },
                  }}
                >
                  Input Language
                </Typography>
                <Typography
                  sx={{
                    fontFamily: settingStyles.fontFamily,
                    fontSize: { md: "0.9rem", xs: "0.6rem" },
                    marginBottom: "15px",
                  }}
                >
                  Choose the language you will be speaking in. Leave blank for
                  auto detection.
                </Typography>

                <TextField
                  id="outlined-input-language"
                  select
                  defaultValue="chinese"
                  sx={{
                    width: "80%",
                    maxHeight: "130px",
                    padding: "0px",
                    border: "1px soild white",
                  }}
                >
                  {languages.map((language) => (
                    <MenuItem key={language} value={language}>
                      {language}
                    </MenuItem>
                  ))}
                </TextField>
              </Paper>
            </Grid>

            {/* output language */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: { md: "flex-start", xs: "center" },
              }}
            >
              <Paper
                elevation={2}
                sx={{
                  background: settingStyles.background_layer02,
                  width: { md: "50%", xs: "80%" },
                  color: "white",
                  borderRadius: "15px",
                  padding: "15px 50px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: settingStyles.fontFamily,
                    fontSize: { md: "1.5rem", xs: "1rem" },
                  }}
                >
                  Output Language
                </Typography>
                <Typography
                  sx={{
                    fontFamily: settingStyles.fontFamily,
                    marginBottom: "15px",
                    fontSize: { md: "0.9rem", xs: "0.6rem" },
                  }}
                >
                  Generate written content in almost any language you can think
                  of.
                </Typography>

                <TextField
                  id="outlined-input-language"
                  select
                  defaultValue="japanese"
                  sx={{
                    width: "80%",
                    maxHeight: "130px",
                    padding: "0px",
                    border: "1px soild white",
                  }}
                >
                  {languages.map((language) => (
                    <MenuItem key={language} value={language}>
                      {language}
                    </MenuItem>
                  ))}
                </TextField>
              </Paper>
            </Grid>
          </Grid>

          {/* Prime settings */}
          <Grid
            container
            spacing={1}
            sx={{
              border: "2px solid white",
              margin: "20px auto",
              borderRadius: "20px",
              width: { lg:"60%",md: "70%",s:"80%", xs: "90%" },
              background: settingStyles.background_layer01,
            }}
          >
            {/* header one */}
            <Grid item md={12} xs={12}>
              <Typography
                variant="h4"
                sx={{
                  margin: { md: "20px auto 10px", xs: "5px auto" },
                  fontFamily: "monospace,sans-serif",
                  fontSize: { md: "2rem", xs: "1rem" },
                }}
              >
                Prime Settings
              </Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <Box
                sx={{
                  width: { md: "2%", xs: "5%" },
                  height: "5px",
                  background: "red",
                  borderRadius: "2px",
                  margin: "0px auto",
                }}
              ></Box>
            </Grid>

            {/* header two */}
            <Grid item md={12} xs={12}>
              <Typography
                sx={{
                  fontFamily: "monospace,sans-serif",
                  fontSize: { md: "1.2rem", xs: "0.8rem" },
                }}
              >
                To access these settings, you'll have to upgrade to AudioPen
                Prime.{" "}
              </Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "monospace,sans-serif",
                  fontSize: { md: "1.2rem", xs: "0.8rem" },
                }}
              >
                Rewrite Level
              </Typography>
            </Grid>

            {/* rewrite pannel with three sheet */}
            <Grid
              item
              md={12}
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  width: { md: "70%", xs: "90%" },
                  background: settingStyles.background_layer02,
                  borderRadius: "30px",
                }}
              >
                <RewriteLevel />
              </Box>
            </Grid>

            {/* special words */}
            <Grid
              item
              md={6}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: { md: "flex-end", xs: "center" },
                marginTop: { md: "20px", xs: "10px" },
                background: settingStyles.background_layer01,
              }}
            >
              <Box
                sx={{
                  width: { md: "80%", xs: "90%" },
                  background: settingStyles.background_layer02,
                  borderRadius: "30px",
                  minHeight: "180px",
                  padding: "5px 10px 10px 10px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: { md: "1.5rem", xs: "1rem" } }}
                >
                  Special words
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      md: "0.9rem",
                      xs: "0.8rem",
                      marginBottom: "10px",
                    },
                  }}
                >
                  Add names or specific terms that you want AudioPen to spell
                  correctly.
                </Typography>
                <TextField
                  multiline
                  rows={3}
                  sx={{
                    width: "90%",
                    // border: "1px solid white",
                    borderRadius: "15px",
                    marginBottom: "10px",
                    background: settingStyles.background_layer01,
                  }}
                  placeholder={"separate each word with a comma"}
                ></TextField>
              </Box>
            </Grid>

            {/* quick selection */}
            <Grid
              item
              md={6}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: { md: "flex-start", xs: "center" },
                marginTop: { md: "20px", xs: "10px" },
              }}
            >
              <Box
                sx={{
                  width: { md: "80%", xs: "90%" },
                  borderRadius: "30px",
                  minHeight: "160px",
                  background: settingStyles.background_layer02,
                  padding: "5px 10px 10px 10px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: { md: "1.5rem", xs: "1rem" } }}
                >
                  Quick Selection
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    margin: "15px auto",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontSize: { md: "1rem", xs: "0.9rem" } }}
                  >
                    language
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: { md: "1rem", xs: "0.9rem" } }}
                  >
                    style
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: {
                      md: "0.9rem",
                      xs: "0.8rem",
                      marginBottom: "10px",
                    },
                  }}
                >
                  After you finish a voice note, AudioPen will ask you what
                  style and language you want it to be written in.
                </Typography>
              </Box>
            </Grid>

            {/* folder management */}
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
                  width: { md: "80%", xs: "90%" },
                  background: settingStyles.background_layer02,
                  borderRadius: "30px",
                  minHeight: "140px",
                  padding: "10px 20px",
                  marginTop: "10px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: { md: "1.5rem", xs: "1rem" } }}
                >
                  Folder Management
                </Typography>

                <Typography
                  sx={{
                    fontSize: {
                      md: "0.9rem",
                      xs: "0.8rem",
                      marginBottom: "10px",
                    },
                  }}
                >
                  Create and manage folders that you can organise your notes
                  within.
                </Typography>
                <Button
                  variant="text"
                  sx={{
                    background: settingStyles.background_layer01,
                    color: "white",
                    borderRadius: "20px",
                    padding: "10px 15px",
                    width: { md: "60%", xs: "90%" },
                  }}
                >
                  Manage folders
                </Button>
              </Box>
            </Grid>

            {/* integrations */}
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
                  width: { md: "80%", xs: "90%" },
                  background: settingStyles.background_layer02,
                  borderRadius: "30px",
                  minHeight: "140px",
                  padding: "10px 20px",
                  marginTop: "10px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: { md: "1.5rem", xs: "1rem" } }}
                >
                  Integrations
                </Typography>

                <Typography
                  sx={{
                    fontSize: {
                      md: "0.9rem",
                      xs: "0.8rem",
                      marginBottom: "10px",
                    },
                  }}
                >
                  Export your notes to other apps via Zapier or a webhook.
                  within.
                </Typography>
                <Button
                  variant="text"
                  sx={{
                    background: settingStyles.background_layer01,
                    color: "white",
                    borderRadius: "20px",
                    padding: "10px 15px",
                    width: { md: "60%", xs: "90%" },
                  }}
                >
                  Set up integrations
                </Button>
              </Box>
            </Grid>

            {/* Colors */}
            <Grid
              item
              xs={12}
              md={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  width: { md: "80%", xs: "90%" },
                  background: settingStyles.background_layer02,
                  borderRadius: "30px",
                  marginTop: "20px",
                }}
              >
                {/* colors-header */}
                <Typography
                  variant="h6"
                  sx={{ fontSize: { md: "1.5rem", xs: "1rem" } }}
                >
                  Colors
                </Typography>

                {/* colors-description */}
                <Typography
                  sx={{
                    fontSize: {
                      md: "0.9rem",
                      xs: "0.8rem",
                      marginBottom: "10px",
                    },
                  }}
                >
                  Change the colors and branding of the shareable images of your
                  notes, as well as the colors on your notes viewed in focus
                  mode.
                </Typography>

                {/* theme and brand */}
                <Grid container spacing={2}>

                  {/* theme */}
                  <Grid
                    item
                    md={6}
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: { md: "flex-end", xs: "center" },
                    }}
                  >
                    <Grid
                      container
                      sx={{
                        background: settingStyles.background_layer03,
                        borderRadius: "20px",
                      }}
                    >
                      <Grid item xs={12} md={12}>
                        <Typography
                          variant="h6"
                          sx={{ fontSize: { md: "1.5rem", xs: "1rem" } }}
                        >
                          Theme
                        </Typography>
                      </Grid>

                      <Grid
                        item
                        md={6}
                        xs={12}
                        sx={{
                          display: "flex",
                          justifyContent: { md: "space-between", xs: "center" },
                          flexDirection: "column",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <input type="color" />
                          <Typography variant="body2">Background</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <input type="color" />
                          <Typography variant="body2">Text</Typography>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={12}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "column",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <input type="color" />
                          <Typography variant="body2">Brand</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <input type="color" />
                          <Typography variant="body2">Brand Text</Typography>
                        </Box>
                      </Grid>
                      <Grid item md={12} xs={12} sx={{ width: "80%" }}>
                        <Button
                          variant="text"
                          sx={{
                            color: "white",
                            background: "rgba(80, 80, 89, 1)",
                            margin: "10px auto",
                            borderRadius: "15px",
                            padding: "8px 10px",
                            fontSize: "0.8rem",
                          }}
                        >
                          reset to default color
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* brand */}
                  <Grid
                    item
                    md={6}
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: { md: "flex-end", xs: "center" },
                    }}
                  >
                    <Grid
                      container
                      sx={{
                        background: settingStyles.background_layer03,
                        borderRadius: "20px",
                      }}
                    >
                      <Grid item xs={12} md={12}>
                        <Typography
                          variant="h6"
                          sx={{ fontSize: { md: "1.5rem", xs: "1rem" } }}
                        >
                          Branding
                        </Typography>
                      </Grid>

                      <Grid item md={12} xs={12}>
                        <Typography
                          sx={{
                            fontSize: {
                              md: "1rem",
                              xs: "0.8rem",
                              margin: "10px",
                            },
                          }}
                        >
                          Display your name, social handle, or brand at the
                          bottom of each shareable image of your note
                        </Typography>
                      </Grid>

                      <Grid item md={12} xs={12} sx={{ width: "80%" }}>
                        <TextField
                          sx={{
                            width: "90%",
                            background: settingStyles.textareaBackground,
                            marginBottom: "10px",
                            borderRaduis:"10px",
                          }}
                          placeholder={"Type here"}
                          size="small"
                        ></TextField>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/*Beta Progarm  */}

            <Grid
              item
              xs={12}
              md={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  background: settingStyles.background_layer02,
                  padding: "20px 30px 20px",
                  margin: "20px auto",
                  borderRadius: "20px",
                  width: { md: "60%", xs: "90%" },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: { md: "1.5rem", xs: "1rem" } }}
                >
                  Beta Progarm
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: { md: "1rem", xs: "0.6rem" } }}
                >
                  Join the AudioPen Beta Program and get early access to
                  features that I'm building.
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Button
            sx={{
              background: "rgba(255,92,10,1)",
              color: "white",
              borderRadius: "20px",
              margin: "20px auto 40px",
              padding: "8px 26px",
            }}
          >
            Explore AudioPen Prime
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default SettingModal;
