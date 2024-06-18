import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MicVisualizer from "./MicVisualizer";
import { Microphone, OsTypeProps } from "./MicrophoneClass";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ChooseStyleModal from "./ChooseStyleModal";
import { newBlobToWav } from "./blobToWav";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hook/useFetch";
import { UserStatusType } from "../../constants/props";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: "600px", xs: "95%" },
  bgcolor: "rgba(255,92,10,1)",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "40px",
  p: 0,
  m: 0,
  display: "block",
};

export type RecordMountProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedType?: string;
  setSelectedType?: React.Dispatch<React.SetStateAction<string>>;
};

// type AudioStatusType =
//   | "initial"
//   | "recording"
//   | "stopping"
//   | "pausing"
//   | "playing";

const HandleRecordMount = (props: RecordMountProps) => {
  const { user, authTokens, setGetAudioContext } = useAuth();
  const navigate = useNavigate();
  const { data: user_status } = useFetch<UserStatusType>(
    "/api/user-status/" + user?.user_id,
    true
  );
  // open record main modal
  const { open, setOpen } = props;


  // colsed audio upload after this redirect to mainpage
  const [selectedType, setSelectedType] = React.useState<string>(""); //select style type
  const [openChooseStyleModal, setOpenChooseStyleModal] = React.useState(false);

  //set record total time normal 60s prime 60s * 15
  const [timeCountDown, setTimeCountDown] = React.useState<number>(60);

  // const [audioStream, setAudioStream] = React.useState<MediaStream | null>(
  //   null
  // );
  // store blob[] from microphone  return from microphone class function
  const [audioChunks, setAudioChunks] = React.useState<Blob[]>([]);

  // set audio html's audio source
  const [audioUrl, setAudioUrl] = React.useState(""); //audio url

  // set countdown seconds
  const [amountProgress, setAmountProgress] = React.useState(0); // total time
  const [progress, setProgress] = React.useState(0); //spended time

  // after start record show canvas that display the voice's status
  const [showCanvas, setShowCanvas] = React.useState(false);

  // start record status start -> true
  const [showRecordStatus, setShowRecordStatus] = React.useState(false);

  // stop record signal use to show audio html etc
  const [stopRecordSignal, setStopRecordSignal] = React.useState(false); //tt

  // stop record signal use to show play button  etc
  const [pauseRecordSignal, setPauseRecordSignal] = React.useState(false);

  // use to determain show pause icon or play icon
  const [showPlayIcon, setshowPlayIcon] = React.useState(true);

  // use to determain weather show stopbtn
  const [enableStopBtn, setEnableStopBtn] = React.useState(true);

  //show msg on the bottom of the modal

  const [msg, setMsg] = React.useState<string | null>(null);

  const microphone = React.useRef<Microphone | null>(null);
  // const audioElement = React.useRef<HTMLAudioElement>();

  //重新开始
  const init = () => {
    setShowRecordStatus(false);
    setStopRecordSignal(true);
    setPauseRecordSignal(false);
    setEnableStopBtn(true);
    setshowPlayIcon(true);
    setProgress(0);
    setMsg(null);
    if (microphone.current) {
      stopRecording();
    }
  };

  // audioElement.current = document.getElementById("audio") as HTMLAudioElement;
  // Function to start recording audio
  const startRecord = () => {
    setShowRecordStatus(true);
    microphone.current = new Microphone();
    setShowCanvas(true);
  };

  // Function to stop recording audio
  const stopRecording = React.useCallback(() => {
    if (microphone.current) {
      microphone.current.stopRecord();
      let timeout_1 = setTimeout(() => {
        if (microphone.current !== null) {
          microphone.current.stopRecord();
        }
      }, 500);

      // set aduio element src url
      let timeout_2 = setTimeout(() => {
        if (microphone.current) {
          const chunks = microphone.current.stopRecord() as Blob[];
          let source = Array.from(audioChunks);

          for (let chunk of chunks) {
            source.push(chunk);
          }
          // clear duplicate content
          const arr_set = new Set(source);
          source = Array.from(arr_set);
          setAudioChunks(source);

          if (source) {
            const blobs = new Blob(source, { type: "audio/wav" });
            const audioUrlTmp = window.URL.createObjectURL(blobs);
            setAudioUrl(audioUrlTmp);
          }

          // console.log("pushed chunks:", source);
        }
      }, 500);

      return () => {
        clearTimeout(timeout_1);
        clearTimeout(timeout_2);
      };
    }
  }, [audioChunks]);

  //处理开始录音和 暂停按钮
  const handleRecordAndPauseButton = () => {
    if (pauseRecordSignal) {
      stopRecording();
      // setAudioStatus("stopping");
      setStopRecordSignal(true);
    } else {
      setStopRecordSignal(false);
      startRecord();
      // setAudioStatus("recording");
    }
    setPauseRecordSignal((prev) => !prev);
    setshowPlayIcon((prev) => !prev);
  };

  // choose style button clicked stop record and uoload audio to server
  const handleChooseStyleButton = () => {
    setShowCanvas(false); //canvas invisiable
    setStopRecordSignal(true); // stop singanl true
    setPauseRecordSignal(false); // pause signal false
    setOpenChooseStyleModal(true); //choosestyle modal true
    setshowPlayIcon(true); //stopped record => can play the audio
    setEnableStopBtn(false); // stop button disable
    stopRecording(); //stoprecord function
  };

  // html audio element play the audio
  const handlePlay = () => {
    const audioInvisiable = document.getElementById(
      "audio"
    ) as HTMLAudioElement;

    if (audioInvisiable.src) {
      audioInvisiable.play();
    } else {
      alert("录音出错，请您重新操作！");
    }
  };

  const handleCloseModal = () => {
    setShowRecordStatus(false);
    if (microphone.current) {
      microphone.current.stopRecord();
    }
    setOpen(false);
  };

  //set user timeaccount time
  React.useEffect(() => {
    if (user) {
      axios
        .get("/api/user-status/" + user.user_id, {
          headers: {
            "Content-Type": "appliaction/json",
            Authorization: "Bearer " + String(authTokens?.access),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            if (res.data["prime"]) {
              setTimeCountDown(60 * 5);
            }
            if (res.data["plus"]) {
              setTimeCountDown(60 * 15);
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }, [authTokens?.access, user]);

  //handle stop pause signal
  React.useEffect(() => {
    setAmountProgress(timeCountDown);

    if (showRecordStatus) {
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress === amountProgress) {
            setStopRecordSignal(true);
            stopRecording();
            setEnableStopBtn(false);
            clearInterval(timer);
            return amountProgress;
          }
          return prevProgress >= amountProgress
            ? amountProgress
            : prevProgress + 1;
        });
      }, 1000);

      if (stopRecordSignal) {
        setProgress((prev) => prev);
        clearInterval(timer);
      }

      return () => {
        clearInterval(timer);
      };
    }
  }, [
    amountProgress,
    showRecordStatus,
    stopRecordSignal,
    stopRecording,
    timeCountDown,
  ]);

  React.useEffect(() => {
    if (pauseRecordSignal) {
      setProgress((prev) => prev);
    }
  }, [pauseRecordSignal]);

  //handle upload audio file -> when selectType signal send to the useEffect excute these code
  React.useEffect(() => {
    // choose style modal -> send button clicked -> execute code bolow
    if (selectedType) {
      const formData = new FormData();
      const userId = user?.user_id ? user.user_id : "0";
      const file_name = `${user?.user_id}_${new Date()
        .toISOString()
        .replaceAll("-", "")
        .replaceAll(":", "")
        .replaceAll("T", "")
        .replaceAll(".", "")}.wav`;

      formData.append("user_id", String(userId));
      formData.append("file_name",file_name);
      formData.append("styleType", selectedType);

      const file = new Blob(audioChunks, { type: "audio/wav" });
      let sampleRate: number = 48000;
      let channelCount: number = 2;
      let osType: OsTypeProps;
      if (microphone.current) {
        sampleRate = microphone.current.sampleRate!;
        channelCount = microphone.current.channelCount!;
        osType = microphone.current.osType;
        formData.append("osType", String(osType));
        // console.log(`${sampleRate}-${channelCount}-${osType}`)
      }

      newBlobToWav(file, channelCount, sampleRate, 2).then((blob) => {

        formData.append("file", blob);       

        axios
          .post("/voice/upload/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              // Authorization: "Bearer " + String(authTokens?.access),
            },
          })
          .then((res) => {
            if (res.status === 200) {
              if (res.data) {
                setGetAudioContext({
                  ori: res.data["ori"],
                  trans_res: res.data["trans_res"],
                  title: res.data["title"],
                  file_name: res.data["file_name"],
                });
                setOpenChooseStyleModal(false);
                setOpen(false);
                return;
              }
            } else {
              setOpenChooseStyleModal(false);
              setMsg("数据处理失败,请重试");
            }
          })
          .catch((err) => {
            console.error(err);
            setOpenChooseStyleModal(false);
            setMsg("数据处理失败,请重试");
          });
      });
    }
  }, [
    audioChunks,
    navigate,
    selectedType,
    setGetAudioContext,
    setOpen,
    user?.user_id,
  ]);

  return (
    <div>
      {openChooseStyleModal ? (
        <ChooseStyleModal
          open={openChooseStyleModal}
          setOpen={setOpenChooseStyleModal}
          // selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      ) : null}

      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        keepMounted
        disableEnforceFocus
        open={open}
        // onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          {/* recordstatus time countdown canvas stop button download button */}
          {showRecordStatus ? (
            // start record
            <Grid
              container
              spacing={1}
              sx={{
                // height: "22vh",
                // marginBottom: {md:"30px",xs:"10px"},
                textAlign: "center",
                justifyItems: "center",
                display: "block",
                margin: "10px auto",
                width: { lg: "50%", md: "60%", sm: "70%", xs: "90%" },
              }}
            >
              {/* time circle */}

              <Grid item xs={12} md={12}>
                <CircularProgress
                  variant="determinate"
                  value={(progress / amountProgress) * 100}
                  sx={{ margin: "10px auto", color: "white" }}
                />
              </Grid>

              {/* time countdown */}

              <Grid item xs={12} md={12}>
                <Typography
                  sx={{
                    fontSize: { md: "1.5rem", xs: "1rem" },
                    color: "white",
                    fontFamily: "Fraunces",
                  }}
                >
                  {Math.floor((amountProgress - progress) / 60)}:
                  {(amountProgress - progress) % 60 < 10
                    ? `0${(amountProgress - progress) % 60}`
                    : (amountProgress - progress) % 60}
                </Typography>
              </Grid>

              {/* micvisualizer */}

              {showCanvas ? (
                <Grid item xs={12} md={12}>
                  <MicVisualizer microphone={microphone.current} />
                </Grid>
              ) : null}

              {/* stop record */}

              <Box sx={{ visibility: "hidden", width: "0px", height: "0px" }}>
                <Grid item xs={12} md={12}>
                  <Typography>
                    <audio id="audio" controls src={audioUrl}></audio>
                  </Typography>
                </Grid>
              </Box>

              {/* stop and download button */}
              {/* <Grid item xs={12} md={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="text"
                    sx={{ color: "white" }}
                    onClick={() => {
                      setStopRecordSignal(true);
                      stopRecording();
                    }}
                  >
                    停止
                  </Button>
                  <IconButton
                    sx={{
                      background: "white",
                      color: "black",
                    }}
                    disabled={!stopRecordSignal}
                    onClick={saveRecording}
                    // onClick={()=>{microphone.current.saveRecord()}}
                  >
                    <DownloadIcon />
                  </IconButton>
                </Box>
              </Grid> */}

              {/* divider divide the record status and original text */}
              <Grid item xs={12} md={12}>
                <Divider
                  sx={{
                    color: "white",
                    fontSize: "0.8rem",
                    paddingTop: "20px",
                  }}
                />
                {/* 请等待进度完成
                </Divider> */}
              </Grid>
            </Grid>
          ) : null}

          {/* first show message and start/stop/close button */}

          <Box sx={{ height: "20%" }}>
            {/* content disabale for now */}
            {!showRecordStatus ? (
              <>
                <Typography
                  // variant="h6"
                  sx={{
                    margin: { md: "80px auto 10px", xs: "40px auto 10px" },
                    textAlign: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                  }}
                >
                  不知道该说些什么？
                </Typography>

                <Typography
                  sx={{
                    textAlign: "center",
                    color: "white",
                    fontSize: "0.8rem",
                    margin: "5px auto",
                  }}
                >
                  尝试谈论本周你想完成的事情。
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    textAlign: "center",
                    color: "white",
                    margin: "5px auto",
                  }}
                >
                  不要害怕闲逛！
                </Typography>
              </>
            ) : (
              // pause button and select style button
              <Box
                sx={{ display: "flex", justifyContent: "center", gap: "30px" }}
              >
                {/* 选择风格按钮 */}
                <Button
                  variant="outlined"
                  onClick={handleChooseStyleButton}
                  sx={{
                    color: "white",
                    border: "1px solid white",
                    borderRadius: "15px",
                    p: "8px 28px",
                  }}
                  startIcon={<ArrowRightAltIcon />}
                >
                  选择风格
                </Button>
                {user_status?.prime ? (
                  <Button
                    variant="outlined"
                    onClick={handlePlay}
                    disabled={pauseRecordSignal}
                    sx={{
                      color: "white",
                      border: "1px solid white",
                      borderRadius: "15px",
                      p: "8px 28px",
                    }}
                    endIcon={<PauseIcon />}
                  >
                    播放录音
                  </Button>
                ) : null}
              </Box>
            )}
            {msg ? (
              <Box>
                <Container sx={{ textAlign: "center", marginY: "20px" }}>
                  <Typography sx={{ color: "#fff" }} variant="body2">
                    {msg}
                  </Typography>
                </Container>
              </Box>
            ) : null}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
                marginTop: "5%",
              }}
            >
              {/* upload file */}
              <IconButton
                onClick={init}
                sx={{ marginLeft: 4, paddingBottom: 2 }}
              >
                <RefreshIcon
                  sx={{
                    color: "white",
                    borderRadius: "50%",
                    border: "1px solid transparent",
                    margin: 0,
                    paddding: 0,
                  }}
                />
              </IconButton>

              {/* stop / start button */}
              <IconButton
                sx={{ margin: 0 }}
                onClick={handleRecordAndPauseButton}
                disabled={!enableStopBtn}
              >
                {!showPlayIcon ? (
                  <PauseIcon
                    sx={{
                      color: "white",
                      // scale: "2",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      background: "rgba(255,92,10,1)",
                      margin: 0,
                      paddding: 0,
                      fontSize: "4rem",

                      // bottom: "-20px",
                      borderRadius: "50%",
                      border: "3px solid white",
                    }}
                  />
                ) : (
                  <PlayArrowIcon
                    sx={{
                      color: "white",
                      // scale: "2",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      background: "rgba(255,92,10,1)",
                      margin: 0,
                      paddding: 0,
                      fontSize: "4rem",

                      // bottom: "-20px",
                      borderRadius: "50%",
                      border: "3px solid white",
                    }}
                  />
                )}
              </IconButton>

              {/* close micrecord button */}
              <IconButton
                onClick={handleCloseModal}
                sx={{ marginRight: 4, paddingBottom: 2 }}
              >
                <HighlightOffIcon
                  sx={{
                    color: "white",
                    border: "1px solid transparent",
                    margin: 0,
                    paddding: 0,
                  }}
                />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default HandleRecordMount;
