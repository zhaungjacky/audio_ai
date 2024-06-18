import Modal from "@mui/material/Modal";
// import { SignModalProps } from "../../top/TopIconPage";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tooltip from '@mui/material/Tooltip'
import IconButton from "@mui/material/IconButton";
import UploadIcon from "@mui/icons-material/Upload";
import { Link } from "react-router-dom";
import { UserStatusType } from "../../../constants/props";
import { useAuth } from "../../../context/AuthContext";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

type UploadAudioProps = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  user_status: UserStatusType,

}

function UploadAudioModal(props: UploadAudioProps) {
  const { open, setOpen,user_status } = props;
  const { user, authTokens ,setGetAudioContext} = useAuth();
  // const [user_status, setUser_status] = useState<UserStatusType>();

  const [fileName, setFileName] = useState("未选定");
  const [file, setFile] = useState<Blob | null>(null);
  const [fileSize, setFileSize] = useState<number>(0);
  const [msg, setMsg] = useState<string | null>(null);

  // useEffect(() => {
  //   if (user?.user_id) {
  //     fetch("/api/user-status/" + user?.user_id, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: "Bearer " + String(authTokens?.access),
  //       },
  //     })
  //       .then((res) => {
  //         if (res.ok) {
  //           return res.json();
  //         } else {
  //           console.log(res.statusText);
  //         }
  //       })
  //       .then((data: UserStatusType) => {
  //         if (data) {
  //           setUser_status(data);
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [authTokens?.access, user?.user_id]);

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file === null) {
      setMsg("未选择wav文件");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("file_name", fileName);
    const userId = user?.user_id ? user.user_id : "0";
    formData.append("user_id", String(userId));


    const headersInfo = {
      headers: {
        "Content-Type": "multipart/form-data; boundary=something",
        // Authorization: "Bearer " + String(authTokens?.access),
      },
    };

    axios
    .post("/voice/upload/", formData, headersInfo)
    .then((res) => {
      if (res.status === 200) {
        if (res.data) {
          setGetAudioContext({
            ori: res.data["ori"] ?? "fileName",
            trans_res: res.data["trans_res"],
            title: res.data["title"],
          });
          setOpen(false);
          return;
        }
      } else {
        setMsg("数据处理失败,请重试");
        return;
      }
    })
    .catch((err) => {
      console.error(err);
      setMsg("数据处理失败,请重试");
      return;
    });

  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file_blob = event.target.files[0];
      const file_name = file_blob.name;
      const file_size = parseFloat((file_blob.size / (1024 * 1024)).toFixed(2));
      if (file_name !== null && file_name !== undefined) {
        const len = file_name?.split(".").length - 1;
        const fileType = file_name?.split(".")[len];
        if (fileType !== "wav") {
          setMsg("不允许的文件类型");
          return;
        }
        if (file_size > 5.0) {
          setMsg("文件需不大于5M");
          return;
        }
      }
      setFile(file_blob);
      setFileName(file_name);
      setFileSize(file_size);
    console.log(file_name)
    console.log(file_size)

    }
    setMsg(null);
  };

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
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "0px",
            borderRadius: "20px",
            width: { md: "35vw", xs: "90%" },
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" sx={{ margin: "20px auto 10px" }}>
            上传音频文件
          </Typography>
          {user_status?.prime ? (
            <Box>
              <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
                onSubmit={handleSubmit}
              >
                {file ? (
                  <Box sx={{textAlign:"center"}}>
                    <Typography>
                      文件名：{fileName}
                    </Typography>
                    <Typography>
                      尺寸:{fileSize}Mb
                    </Typography>
                  </Box>
                ) : (
                  <Typography>请上传您的wav文件</Typography>
                )}
                <Box>
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    选择文件
                    <VisuallyHiddenInput
                      type="file"
                      accept=".wav"
                      name="file"
                      id="file"
                      onChange={handleFileChange}
                    />
                  </Button>
                </Box>
                <Box><Typography variant="body2" color="error">{msg}</Typography></Box>

                <Box>
                  <Tooltip title="上传" placement="bottom">
                    <IconButton
                      sx={{ color: "white"}}
                      size="large"
                      type="submit"
                    >
                      <UploadIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box>
              <Box
                sx={{
                  width: "5%",
                  height: "5px",
                  background: "red",
                  borderRadius: "2px",
                  margin: "0px auto",
                }}
              ></Box>
              <Typography sx={{ padding: "10px" }}>
                此功能仅限述而作会员使用
              </Typography>
              <Link to="/prime">
                <Button
                  sx={{
                    background: "rgba(255,92,10,1)",
                    color: "white",
                    borderRadius: "20px",
                    margin: "20px auto 40px",
                    padding: "8px 28px",
                    fontSize: { md: "1rem", xs: "0.6rem" },
                  }}
                >
                  查看所有会员优惠
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default UploadAudioModal;
