import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";

import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { RecordMountProps } from "../microphone/MicRecordPage_tn";
import { settingStyles } from "../settings/SettingModal";
import { IconButton, Tooltip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveIcon from "@mui/icons-material/Save";
import { Link } from "react-router-dom";
import useFetch from "../../hook/useFetch";
import { UserStatusType } from "../../constants/props";

const CreateNoteModal = (props: RecordMountProps) => {
  const { open, setOpen } = props;
  const { getAudioContext, user, authTokens } = useAuth();
  const handleClose = () => setOpen(false);

  const { data: user_status } = useFetch<UserStatusType>(
    "/api/user-status/" + user?.user_id,
    true
  );

  let textRef = React.useRef<HTMLTextAreaElement | undefined>();

  const [clipboardStatus, setClipboardStatus] = React.useState<string | null>();
  const [context, setContext] = React.useState<string | null | undefined>(
    getAudioContext?.trans_res
  );

  const [addTagWarning, setAddTagWarning] = React.useState(false);
  const [tags, setTags] = React.useState([] as string[]);
  const [showOrigalText, setShowOrigalText] = React.useState(false);

  const handleCopyClipboard = (context: string | null | undefined) => {
    if (context) {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(context)
          .then(() => {
            setClipboardStatus("复制成功");
            const timer = setTimeout(() => {
              setClipboardStatus(null);
            }, 2000);
            return () => clearTimeout(timer);
          })
          .catch((err) => {
            console.error("复制失败: ", err);
            const timer = setTimeout(() => {
              setClipboardStatus(null);
            }, 2000);
            return () => clearTimeout(timer);
          });
      } else {
        setClipboardStatus("浏览器不支持");
        const timer = setTimeout(() => {
          setClipboardStatus(null);
        }, 2000);
        return () => clearTimeout(timer);
      }
    } else {
      setClipboardStatus("无内容供复制");
      const timer = setTimeout(() => {
        setClipboardStatus(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  };

  const handleContextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContext(e.target.value);
    console.log(e.target.value);
  };

  const handleAddTag = () => {
    if (!user_status?.prime) {
      setAddTagWarning(true);
    } else {
      // console.log("add tag");
      setTags(["test0", "test1", "test2", "test3", "test4", "test5"]);
      setClipboardStatus("创建标签成功!");
      const timer = setTimeout(() => {
        setClipboardStatus(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  };

  const handlSaveNote = () => {
    const obj = {
      title: getAudioContext?.title,
      ori: getAudioContext?.ori,
      trans_res: context,
      tag_0: tags[0],
      tag_1: tags[1],
      tag_2: tags[2],
      tag_3: tags[3],
      tag_4: tags[4],
      tag_5: tags[5],
      userStatus_id : user_status?.id,
    };

    console.log(obj)

    axios.post('/api/notes/',JSON.stringify(obj),{
      headers:{
        "Content-Type":"application/json",
        authorization:"Bearer " + String(authTokens?.access)
      }
    })
    .then(res=>{
      console.log(res)
      setClipboardStatus("保存成功！")
      const timer = setTimeout(()=>{
        setClipboardStatus(null)
      },2000);
      return clearTimeout(timer);
    })
    .catch(err=>console.log(err));
  };


  return (
    <div>
      <Modal
        keepMounted
        disableEnforceFocus
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Container
          sx={{
            border: "none",
            width: { xs: "90%", sm: "60%", md: "50%", lg: "40%" },
          }}
        >
          <Box
            sx={{
              background: settingStyles.background_black,
              minHeight: "40%",
              marginX: "auto",
              marginY: "50px 0px",
              padding: "20px",
              borderRadius: "30px",
            }}
          >
            <Box sx={{ textAlign: "center", marginY: "20px" }}>
              <Typography
                variant="h6"
                sx={{
                  color: "#F2F3F4",
                  marginTop: "20px",
                }}
              >
                您的笔记
              </Typography>
            </Box>

            {/* context from server when voice reconglition finished and retrun data */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                marginY: "20px",
                flexDirection: "column",
              }}
            >
              <Typography>{getAudioContext?.title}</Typography>
              <TextField
                multiline
                rows={4}
                id="creat_note_textarea"
                inputRef={textRef}
                variant="filled"
                sx={{ width: "80%", color: "white" }}
                defaultValue={
                  getAudioContext?.trans_res ??
                  "not success? you can add some text here"
                }
                onChange={handleContextChange}
              />
            </Box>

            {/* add tag */}
            <Box sx={{ textAlign: "left", marginY: "20px" }}>
              <Button
                variant="text"
                sx={{ border: "1px dash white", color: "white" }}
                onClick={handleAddTag}
              >
                添加标签
              </Button>
              {addTagWarning ? (
                <Container
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: "white" }}>
                    请购买会员后进行操作
                    <Link to="/prime" target="_blank">
                      <Button variant="text">点我</Button>
                    </Link>
                  </Typography>
                </Container>
              ) : null}
            </Box>

            {/* close share copy save btn */}
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Tooltip title="删除" placement="bottom">
                <IconButton onClick={handleClose}>
                  <DeleteIcon sx={{ color: "#F2F3F4" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="分享" placement="bottom">
                <IconButton>
                  <ShareIcon sx={{ color: "#F2F3F4" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="复制" placement="bottom">
                <IconButton onClick={() => handleCopyClipboard(context)}>
                  <ContentCopyIcon sx={{ color: "#F2F3F4" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="保存" placement="bottom">
                <IconButton onClick={handlSaveNote}>
                  <SaveIcon sx={{ color: "#F2F3F4" }} />
                </IconButton>
              </Tooltip>
            </Box>
            {clipboardStatus ? (
              <Box sx={{ textAlign: "center", margin: "20px auto" }}>
                <Typography variant="body2" sx={{ color: "red" }}>
                  {clipboardStatus}
                </Typography>
              </Box>
            ) : null}
          </Box>
          <Box sx={{ textAlign: "center", width: "80%", marginX: "auto" }}>
            {showOrigalText ? (
              <Box
                sx={{
                  paddingY: "20px 10px",
                  paddingX: "auto",
                  color: "red",
                  textAlign: "center",
                }}
              >
                <Typography variant="body2" sx={{ color: "white" }}>
                  {getAudioContext?.ori}
                </Typography>
              </Box>
            ) : null}

            <Button
              onClick={() => setShowOrigalText((prev) => !prev)}
              sx={{ color: "white", backgroundColor: "grey", paddingY: 0 }}
            >
              <Box
                sx={{
                  background: "red",
                  padding: "0px 28px 8px 29px",
                  borderBottomRightRadius: "16px",
                  borderBottomLeftRadius: "16px",
                }}
              >
                查看原始文本
              </Box>
            </Button>
          </Box>
        </Container>
      </Modal>
    </div>
  );
};

export default CreateNoteModal;
