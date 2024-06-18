import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../context/AuthContext";
import { settingStyles } from "../settings/SettingModal";
import { IconButton, Tooltip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { Link, useNavigate } from "react-router-dom";
import { NoteTypeProps, UserStatusType } from "../../constants/props";
import ClickableAddDeleteTag from "./ClickableAddDeleteTag";
import axios from "axios";

type NoteModalTypes = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  context_props: NoteTypeProps;
  user_status: UserStatusType;
  newContext: boolean;
  setNotes: React.Dispatch<React.SetStateAction<NoteTypeProps[]>>;
  notesLimit: number;
  notes: NoteTypeProps[];
};

const NoteModal = (props: NoteModalTypes) => {
  const {
    open,
    setOpen,
    context_props,
    user_status,
    newContext,
    notes,
    setNotes,
    notesLimit,
  } = props;
  const { authTokens ,setGetAudioContext} = useAuth();
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  //set msg detail on multiplue cicrumstances
  const [clipboardStatus, setClipboardStatus] = React.useState<string | null>();

  // textRef bind to the textarea => context
  let textRef = React.useRef<HTMLTextAreaElement | undefined>();
  //modal's main context=> after transcript version
  const [context, setContext] = React.useState<string | null | undefined>(
    context_props?.trans_res
  );

  //tagInputRef to record user's input tag to send to server
  const tagInputRef = React.useRef<HTMLInputElement>();

  //titleInputRef to record context's title to send to server
  const titleInputRef = React.useRef<HTMLInputElement>();

  //normal user is not authorized to add tag
  const [addTagWarning, setAddTagWarning] = React.useState(false);

  //store/modify user's notes's tags
  const [tags, setTags] = React.useState([] as string[]);

  //show user's notes' orignial script
  const [showOrigalText, setShowOrigalText] = React.useState(false);

  //default users notes tags=> when user delete the notes's tag, defaultTags use to store the tag for user if the user want to  readd to tags
  const [defautleTags, setDefautleTags] = React.useState([] as string[]);

  // copy notes to clipboard
  const handleCopyClipboard = (context: string | null | undefined) => {
    if (context) {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(context)
          .then(() => {
            setClipboardStatus("复制成功");
            const timer = setTimeout(() => {
              setClipboardStatus(null);
            }, 1000);
            return () => clearTimeout(timer);
          })
          .catch((err) => {
            console.error("复制失败: ", err);
            const timer = setTimeout(() => {
              setClipboardStatus(null);
            }, 1000);
            return () => clearTimeout(timer);
          });
      } else {
        setClipboardStatus("浏览器不支持");
        const timer = setTimeout(() => {
          setClipboardStatus(null);
        }, 1000);
        return () => clearTimeout(timer);
      }
    } else {
      setClipboardStatus("无内容供复制");
      const timer = setTimeout(() => {
        setClipboardStatus(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  };

  //handle user change the transcript note
  const handleContextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContext(e.target.value);
  };

  //handle prime user add tag to notes  only prime allowed
  const handleAddTag = () => {
    if (!user_status?.prime) {
      setAddTagWarning(true);
      return;
    }
    tagInputRef.current = document.getElementById(
      "input_tag"
    ) as HTMLInputElement;

    // console.log(tagInputRef.current.value);
    if (tagInputRef.current.value) {
      const newTag = tagInputRef.current.value;
      // let status = "创建标签成功!";
      setTags((prev) => {
        let arr = Array.from(prev);
        arr = arr.filter((item) => item !== "");

        if (arr.indexOf(newTag) === -1 && defautleTags.indexOf(newTag) === -1) {
          arr.unshift(newTag);
          tagInputRef.current!.value = "";
          if (arr.length > 6) {
            setClipboardStatus("标签数量小于6!");
            return prev;
          } else {
            setClipboardStatus("创建标签成功!");
            return arr;
          }
        } else {
          tagInputRef.current!.value = "";
          setClipboardStatus("存在相同标签!");
          return prev;
        }
      });

      // if (tags.length >= 0 && tags.length <=6) {
      //   setClipboardStatus("创建标签成功!");
      // } else {
      //   setClipboardStatus("标签数量小于6!")
      // }
    } else {
      setClipboardStatus("无标签!");
    }
    const timer = setTimeout(() => {
      setClipboardStatus(null);
    }, 1000);
    return () => clearTimeout(timer);
  };

  // save note to the server
  const handlSaveNote = () => {
    //handle old notes ,update data
    const titleContent = titleInputRef.current?.value ?? context_props?.title;
    if (!newContext) {
      let obj = {
        title: titleContent,
        ori: context_props?.ori,
        trans_res: context,
        tag_0: tags[0] ?? "",
        tag_1: tags[1] ?? "",
        tag_2: tags[2] ?? "",
        tag_3: tags[3] ?? "",
        tag_4: tags[4] ?? "",
        tag_5: tags[5] ?? "",
        file_name: context_props?.file_name,
        userStatus_id: user_status["id"],
      };

      // console.log(obj)

      axios
        .put("/api/notes/" + context_props.id, obj, {
          headers: {
            "Content-Type": "application/json",
            // Authorization:"Bearer " + String(authTokens?.access)
          },
        })
        .then((res) => {
          // console.log(res.data);
          const tmp: NoteTypeProps = res.data;
          if (res.status === 200) {
            setClipboardStatus("更新成功!");

            setNotes((prev) =>
              prev.map((item) =>
                item.id === tmp.id ? { ...item, ...tmp } : item
              )
            );
            const timer = setTimeout(() => {
              setOpen(false);
            }, 2000);
            return () => clearTimeout(timer);

            // setNotes()
          } else {
            setClipboardStatus("更新失败!");
          }
        })
        .catch((err) => console.log(err));

      // setClipboardStatus("不是新笔记，暂不支持保存!");
      const timer = setTimeout(() => {
        setClipboardStatus(null);
      }, 1500);
      return () => clearTimeout(timer);
    }

    //if notes amount > setting number, return exit func
    if (notes.length >= notesLimit) {
      setClipboardStatus("已达到储存上限,请删除旧笔记后保存!");
      const timer = setTimeout(() => {
        setClipboardStatus(null);
      }, 1000);
      return () => clearTimeout(timer);
    }

    //handle new notes from microphone
    let obj = {
      title: titleContent,
      ori: context_props?.ori,
      trans_res: context,
      tag_0: tags[0] ?? "",
      tag_1: tags[1] ?? "",
      tag_2: tags[2] ?? "",
      tag_3: tags[3] ?? "",
      tag_4: tags[4] ?? "",
      tag_5: tags[5] ?? "",
      file_name: context_props?.file_name,
      userStatus_id: user_status?.id,
    };

    fetch("/api/notes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + String(authTokens?.access),
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        if (res.ok) {
          setClipboardStatus("保存成功！");
          return res.json();
        }
      })
      .then((data: NoteTypeProps) => {
        // console.log(data)
        setNotes((prev) =>
          // [...prev, data]
          {
            let arr_old = prev;
            arr_old.unshift(data);
            return arr_old;
          }
        );

        //set getAudioContext null
        setGetAudioContext({
          "ori": "",
          "trans_res": "",
          "title": "",
          "file_name": "",
        })


        const timer = setTimeout(() => {
          setClipboardStatus(null);
          setOpen(false);
        }, 500);
        return () => clearTimeout(timer);
      })
      .catch((err) =>{
        setClipboardStatus(err)
      });
  };

  //handle delete icon if new close modal  if not delete data from server
  const handleDelete = () => {
    if (newContext) {
      setOpen(false);
      return;
    }
    if (window.confirm("确认删除？")) {
      fetch("/api/notes/" + context_props?.id, { method: "DELETE" })
        .then((res) => {
          if (res.ok) {
            setClipboardStatus("删除成功!");
            setNotes((prev) => {
              const arr = prev.filter((item) => item.id !== context_props?.id);
              if (arr.length === 0) {
                console.log("no notes");
                navigate("/");
              }
              return arr;
            });

            const timer = setTimeout(() => {
              setClipboardStatus(null);
              setOpen(false);
            }, 1000);
            return () => clearTimeout(timer);
          }
        })
        .catch((error) => console.log(error));
    } else {
      return;
    }
  };

  //hanle prime user download audio file from server
  const handleDownload = () => {
    fetch("/voice/uploads/" + context_props?.file_name)
      .then((res) => {
        if (res.ok) {
          return res.blob();
        } else {
          setClipboardStatus(res.statusText);
        }
      })
      .then((data?:Blob) => {
        // Create an object URL for the Blob
        if(data){
          const objectUrl = URL.createObjectURL(data);
          
          // Create a link element to trigger the download
          const downloadLink = document.createElement("a");
          downloadLink.href = objectUrl;
          downloadLink.download = context_props?.file_name as string;
  
          // Trigger the click event to start the download
          downloadLink.click();  
          // Revoke the object URL to release resources
          URL.revokeObjectURL(objectUrl);
          setClipboardStatus('下载成功')
        }
      })
      .catch(err=>{
        setClipboardStatus(err)
      })
  };

  React.useEffect(() => {
    if (!newContext) {
      // const reg = /tag_[0-5]*/
      Object.keys(context_props).forEach((item) => {
        // if(reg.test(item) ){
        if (
          item === "tag_0" ||
          item === "tag_1" ||
          item === "tag_2" ||
          item === "tag_3" ||
          item === "tag_4" ||
          item === "tag_5"
        ) {
          setTags((prev) => [...prev, context_props[item]]);
        }
      });
    }
  }, [context_props, newContext]);

  return (
    <div>
      <Modal
        keepMounted
        disableEnforceFocus
        open={open}
        // onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Container
          sx={{
            border: "none",
            width: { xs: "90%", sm: "80%", md: "60%", lg: "50%" },
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
            <Box sx={{ textAlign: "right",position:"absolute",top:"20px",right:"13%" }}>
              <IconButton sx={{ color: "white" }} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
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
              {/* <Typography>{context_props?.title}</Typography> */}

              <TextField
                id="title_input"
                inputRef={titleInputRef}
                inputProps={{
                  style: {
                    color: "#fff",
                    fontSize: "1rem",
                    border: "0px solid white",
                    textAlign: "center",
                    letterSpacing: "2px",
                  },
                  disabled: !user_status?.prime,
                }}
                // InputLabelProps={{
                //   style: { color: "#fff", fontSize: "1rem",border:"0px solid white" },
                // }}
                defaultValue={context_props?.title}
                placeholder="请添加您的标题"
                // disabled={!user_status?.prime}
              />

              <TextField
                multiline
                minRows={2}
                maxRows={6}
                id="creat_note_textarea"
                inputRef={textRef}
                variant="filled"
                sx={{ width: "80%", color: "white" }}
                inputProps={{
                  style: {
                    color: "#fff",
                    fontSize: ".8rem",
                    border: "0px solid white",
                    textAlign: "left",
                    letterSpacing: "1.2px",
                  },
                  disabled: !user_status?.prime,
                }}
                defaultValue={
                  context_props?.trans_res ??
                  "not success? you can add some text here"
                }
                onChange={handleContextChange}
              />
            </Box>

            {/* add tag */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginY: "20px",
                flexDirection: {xs:"column",sm:"row",md:"row"},
                gap:"10px",
              }}
            >
              {/* 添加标签 */}
              <Button
                variant="outlined"
                sx={{
                  border: "0.5px dashed  white",
                  color: "white",
                  borderRadius: "16px",
                  padding: "3px 20px",
                }}
                onClick={handleAddTag}
                startIcon={<AddIcon fontSize="large" />}
              >
                标签
              </Button>

              {/* 标签输入框 */}
              {user_status?.prime ? (
                <Box
                  component={"form"}
                  onSubmit={handleAddTag}
                  sx={{ minWidth: "60%" }}
                >
                  <TextField
                    sx={{ input: { color: "white" } }}
                    label="输入标签"
                    id="input_tag"
                    size="small"
                    fullWidth
                    color="error"
                    InputLabelProps={{
                      style: {
                        color: "#fff",
                        fontSize: "0.8rem",
                        border: "none",
                      },
                    }}
                  />
                </Box>
              ) : null}
            </Box>

            {/* 显示警告或者添加标签 */}
            <Box>
              {/* 警告 */}
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
              {user_status?.prime ? (
                <Box>
                  {/*  添加标签或者删除标签 */}
                  <Box
                    sx={{
                      display: "felx",
                      gap: "20px",
                      flexDirection: "column",
                    }}
                  >
                    {/* users tags */}
                    <Box sx={{ marginY: "10px" }}>
                      <ClickableAddDeleteTag
                        addOrDelete={false}
                        tags={tags}
                        setTags={setTags}
                        defautleTags={defautleTags}
                        setDefautleTags={setDefautleTags}
                        setClipboardStatus={setClipboardStatus}
                      />
                    </Box>
                    {/* default tags */}
                    <Box sx={{ marginY: "10px" }}>
                      <ClickableAddDeleteTag
                        addOrDelete={true}
                        tags={tags}
                        setTags={setTags}
                        defautleTags={defautleTags}
                        setDefautleTags={setDefautleTags}
                        setClipboardStatus={setClipboardStatus}
                      />
                    </Box>
                  </Box>
                </Box>
              ) : null}
            </Box>
            {/* default tags content */}

            {/* close share copy save btn */}
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Tooltip title="删除" placement="bottom">
                <IconButton onClick={handleDelete}>
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
            <Box>
              {showOrigalText ? (
                <Box
                  sx={{
                    paddingY: "20px 10px",
                    paddingX: "auto",
                    color: "red",
                    margin: "10px auto",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body2" sx={{ color: "white",marginBottom:"10px",textAlign:"left", }}>
                    {context_props?.ori}
                  </Typography>

                  {/* <Button onClick={handleDownload}>Download wav</Button> */}
                  {user_status?.prime ? <Button onClick={handleDownload} color="error">下载语音</Button>:null}
                </Box>
              ) : null}
            </Box>
          </Box>
          <Box sx={{ textAlign: "center", width: "80%", marginX: "auto" }}>
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
                {showOrigalText ? "隐藏原始文本" : "查看原始文本"}
              </Box>
            </Button>
          </Box>
        </Container>
      </Modal>
    </div>
  );
};

export default NoteModal;
