import Modal from "@mui/material/Modal";
import { SignModalProps } from "../top/TopIconPage";
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
import { Link } from "react-router-dom";

const inputLanguages: string[] = ["普通话", "广东话", "四川话"];
const outputLanguages: string[] = ["中文", "英语"];

export const settingStyles = {
  background_body:"#00000010",
  background_main: "rgba(61, 63, 84, 1)",
  background_layer01: "rgba(65, 65, 85, 0.8)",
  background_layer02: "rgba(70, 70, 90, 0.8)",
  background_layer03: "rgba(76, 76, 96, 1)",
  background_layer04: "rgba(86, 86, 86, 1)",
  background_layer05: "rgba(96, 76, 96, 1)",
  background_layer06: "rgba(247, 240, 240, 1)",
  background_white: "rgba(200, 220, 220, 1)",
  background_black: "rgba(25, 26, 8, 1)",
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
            设置
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
                  background: settingStyles.background_layer02,
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
                  输入语言
                </Typography>
                <Typography
                  sx={{
                    fontFamily: settingStyles.fontFamily,
                    fontSize: { md: "0.9rem", xs: "0.6rem" },
                    marginBottom: "15px",
                    minHeight:"44px",
                  }}
                >
                  选择您要使用的语言，留空以进行自动检测。
                </Typography>

                <TextField
                  id="outlined-language-settings-input"
                  select
                  defaultValue="普通话"
                  sx={{
                    width: "80%",
                    maxHeight: "130px",
                    padding: "0px",
                    border: "1px soild white",
                  }}
                  inputProps={{
                    style:{color:"#fff"}
                  }}
                >
                  {inputLanguages.map((language) => (
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
                  输出语言
                </Typography>
                <Typography
                  sx={{
                    fontFamily: settingStyles.fontFamily,
                    marginBottom: "15px",
                    fontSize: { md: "0.9rem", xs: "0.6rem" },
                    minHeight:"44px",
                  }}
                >
                  以您能想到的几乎任何语言生成书面内容
                </Typography>

                <TextField
                  id="outlined-language-settings-output"
                  select
                  defaultValue="中文"

                  sx={{
                    width: "80%",
                    maxHeight: "130px",
                    padding: "0px",
                    border: "1px soild white",
                  }}
                  inputProps={{
                    style:{color:"#fff"}
                  }}
                >
                  {outputLanguages.map((language) => (
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
              padding:"20px",
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
                会员设置
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
                要使用这些设置，您必须升级到述而作会员。
              </Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <Link to='/prime' target="_blank">
                <Button variant="text" sx={{background:"white",color:"black",borderRadius:"15px",padding:"8px 28px",margin:"20px auto",}}>查看会员福利</Button>
              </Link>
            </Grid>

            <Grid item md={12} xs={12}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "monospace,sans-serif",
                  fontSize: { md: "1.2rem", xs: "0.8rem" },
                }}
              >
                重写等级
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
                  sx={{ fontSize: { md: "1.5rem", xs: "1rem" }, margin:"10px auto", }}
                >
                  特殊词
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
                  添加您希望述而作正确拼写的名称或特定术语
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
                  inputProps={{
                    style:{color:"white"}
                  }}
                  placeholder={"用逗号分开单个词语"}
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
                  sx={{ fontSize: { md: "1.5rem", xs: "1rem" },margin:"10px auto", }}
                >
                  快速选择
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
                    语言
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: { md: "1rem", xs: "0.9rem" } }}
                  >
                    风格
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
                  完成语音笔记后，述而作会询问您希望使用哪种风格和语言书写
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
                  sx={{ fontSize: { md: "1.5rem", xs: "1rem" },margin:"10px auto", }}
                >
                  文件夹管理
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
                  创建和管理文件夹，您可以在其中整理笔记
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
                  管理文件夹
                </Button>
              </Box>
            </Grid>

            {/* integrations */}
            {/* <Grid
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
                  sx={{ fontSize: { md: "1.5rem", xs: "1rem" },margin:"10px auto", }}
                >
                  集成
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
                  通过 Zapier 或 Webhook 将笔记导出到其他应用程序
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
                  集成设置
                </Button>
              </Box>
            </Grid> */}



            {/*Beta Progarm  */}

            {/* <Grid
              item
              xs={12}
              md={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  background: settingStyles.background_layer02,
                  padding: "10px 30px 10px",
                  margin: "20px auto",
                  borderRadius: "20px",
                  width: { md: "60%", xs: "90%" },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: { md: "1.5rem", xs: "1rem" },margin:"10px auto", }}
                >
                  测试程序
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: { md: "1rem", xs: "0.6rem" } }}
                >
                  加入述而作Beta计划并尽早使用我正在开发的功能
                </Typography>
              </Box>
            </Grid> */}
          </Grid>
          <Link to="/prime">
            <Button
              sx={{
                background: "rgba(255,92,10,1)",
                color: "white",
                borderRadius: "20px",
                margin: "20px auto 40px",
                padding: "8px 28px",
              }}
            >
              探索述而作会员
            </Button>
          </Link>
        </Box>
      </Modal>
    </div>
  );
};

export default SettingModal;



            // {/* Colors */}
            // <Grid
            //   item
            //   xs={12}
            //   md={12}
            //   sx={{ display: "flex", justifyContent: "center" }}
            // >
            //   <Box
            //     sx={{
            //       width: { md: "80%", xs: "90%" },
            //       background: settingStyles.background_layer02,
            //       borderRadius: "30px",
            //       marginTop: "20px",
            //     }}
            //   >
            //     {/* colors-header */}
            //     <Typography
            //       variant="h6"
            //       sx={{ fontSize: { md: "1.5rem", xs: "1rem" },margin:"10px auto", }}
            //     >
            //       颜色
            //     </Typography>

            //     {/* colors-description */}
            //     <Typography
            //       sx={{
            //         fontSize: {
            //           md: "0.9rem",
            //           xs: "0.8rem",
            //           marginBottom: "10px",
            //         },
            //       }}
            //     >
            //       更改笔记的可共享图像的颜色和品牌，以及在关注模式下查看的笔记上的颜色
            //     </Typography>

            //     {/* theme and brand */}
            //     <Grid container spacing={2}>

            //       {/* theme */}
            //       <Grid
            //         item
            //         md={6}
            //         xs={12}
            //         sx={{
            //           display: "flex",
            //           justifyContent: { md: "flex-end", xs: "center" },
            //         }}
            //       >
            //         <Grid
            //           container
            //           sx={{
            //             background: settingStyles.background_layer03,
            //             borderRadius: "20px",
            //           }}
            //         >
            //           <Grid item xs={12} md={12}>
            //             <Typography
            //               variant="h6"
            //               sx={{ fontSize: { md: "1.2rem", xs: "1rem" } ,margin:"10px auto", }}
            //             >
            //               主题
            //             </Typography>
            //           </Grid>

            //           <Grid
            //             item
            //             md={6}
            //             xs={12}
            //             sx={{
            //               display: "flex",
            //               justifyContent: { md: "space-between", xs: "center" },
            //               flexDirection: "column",
            //             }}
            //           >
            //             <Box sx={{ display: "flex", alignItems: "center" }}>
            //               <input type="color" />
            //               <Typography variant="body2">背景</Typography>
            //             </Box>
            //             <Box sx={{ display: "flex", alignItems: "center" }}>
            //               <input type="color" />
            //               <Typography variant="body2">文本</Typography>
            //             </Box>
            //           </Grid>
            //           <Grid
            //             item
            //             md={6}
            //             xs={12}
            //             sx={{
            //               display: "flex",
            //               justifyContent: "space-between",
            //               flexDirection: "column",
            //             }}
            //           >
            //             <Box sx={{ display: "flex", alignItems: "center" }}>
            //               <input type="color" />
            //               <Typography variant="body2">品牌</Typography>
            //             </Box>
            //             <Box sx={{ display: "flex", alignItems: "center" }}>
            //               <input type="color" />
            //               <Typography variant="body2">品牌文字</Typography>
            //             </Box>
            //           </Grid>
            //           <Grid item md={12} xs={12} sx={{ width: "80%" }}>
            //             <Button
            //               variant="text"
            //               sx={{
            //                 color: "white",
            //                 background: "rgba(80, 80, 89, 1)",
            //                 margin: "10px auto",
            //                 borderRadius: "15px",
            //                 padding: "8px 10px",
            //                 fontSize: "0.8rem",
            //               }}
            //             >
            //               设置默认颜色
            //             </Button>
            //           </Grid>
            //         </Grid>
            //       </Grid>

            //       {/* brand */}
            //       <Grid
            //         item
            //         md={6}
            //         xs={12}
            //         sx={{
            //           display: "flex",
            //           justifyContent: { md: "flex-end", xs: "center" },
            //         }}
            //       >
            //         <Grid
            //           container
            //           sx={{
            //             background: settingStyles.background_layer03,
            //             borderRadius: "20px",
            //           }}
            //         >
            //           <Grid item xs={12} md={12}>
            //             <Typography
            //               variant="h6"
            //               sx={{ fontSize: { md: "1.2rem", xs: "1rem"}  ,margin:"10px auto",}}
            //             >
            //               品牌推广
            //             </Typography>
            //           </Grid>

            //           <Grid item md={12} xs={12}>
            //             <Typography
            //               sx={{
            //                 fontSize: {
            //                   md: "1rem",
            //                   xs: "0.8rem",
            //                   margin: "10px",
            //                 },
            //               }}
            //             >
            //               在笔记的每个可共享图片的底部显示您的姓名、社交账号或品牌
            //             </Typography>
            //           </Grid>

            //           <Grid item md={12} xs={12} sx={{ width: "80%" }}>
            //             <TextField
            //               sx={{
            //                 width: "90%",
            //                 background: settingStyles.textareaBackground,
            //                 marginBottom: "10px",
            //                 borderRaduis:"10px",
            //               }}
            //               placeholder={"在此输入"}
            //               size="small"
            //             ></TextField>
            //           </Grid>
            //         </Grid>
            //       </Grid>
            //     </Grid>
            //   </Box>
            // </Grid>