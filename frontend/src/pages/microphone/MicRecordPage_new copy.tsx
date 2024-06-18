import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import StopIcon from "@mui/icons-material/Stop";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import MicVisualizer from "./MicVisualizer";
import { Microphone } from "./MicrophoneClass";
import { Button } from "@mui/material";
import { Md5 } from "ts-md5";
import CryptoJS from "crypto-js";
import axios from "axios";



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

type RecordMountProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
};

type PostProps = {
  //https://raasr.xfyun.cn/v2/api/getResult?signa=Wv23VLOg%2F6sQ1BDx4DKnnxtgiwQ%3D&orderId=DKHJQ2022090217220902175209AAEBD000015&appId=3e79d91c&resultType=predict&ts=1662112340
  signa: string;
  orderId: string;
  appId: string;
  resultType: string;
  ts: string;
  url?:string;
};

const HandleRecordMount = (props: RecordMountProps) => {
  const { open, setOpen } = props;
  const timeCountDown = 61;
  // const [audioStream, setAudioStream] = React.useState<MediaStream | null>(
  //   null
  // );
  // const [audioChunks, setAudioChunks] = React.useState<Blob[]>([]);
  const [amountProgress, setAmountProgress] = React.useState(0);
  const [progress, setProgress] = React.useState(1);
  const [showRecordStatus, setShowRecordStatus] = React.useState(false); // start record -> true
  const [audioUrl, setAudioUrl] = React.useState("");
  const [stopRecordSignal, setStopRecordSignal] = React.useState(false);
  const [showCanvas, setShowCanvas] = React.useState(false);

  const [enableStopBtn, setEnanbleStopBtn] = React.useState(true);
  const [postInfo, setPostInfo] = React.useState({} as PostProps);
  const [returnText,setReturnText] = React.useState([] as string[]);

  type Dataprops = 
    {
      cw: { w: string, wp?: string, wc?: string }[],
      wb?: number,
      we?: number,
    }
  

  // let audioBlob = useRef<Blob>();

  let microphone = React.useRef<Microphone | null>(null);

  // Function to start recording audio
  // const startRecording = () => {
  //   setShowRecordStatus(true);
  //   try {
  //     if (!navigator.mediaDevices) {
  //       alert("mic not authorized!");
  //       return;
  //     }
  //     navigator.mediaDevices
  //       .getUserMedia({ audio: true })
  //       .then((stream) => {
  //         setAudioStream(stream);



  //         mediaRecorder.ondataavailable = (e) => {
  //           if (e.data.size > 0) {
  //             setAudioChunks((prevChunks) => [...prevChunks, e.data]);
  //           }
  //         };
  //         mediaRecorder.start();
  //       })
  //       .catch((error) => {
  //         console.error("Error accessing microphone:", error);
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // Function to start recording audio
  const startRecord = () => {
    setShowRecordStatus(true);
    microphone.current = new Microphone();
    setShowCanvas(true);
  };

  // Function to stop recording audio
  const stopRecording = React.useCallback(() => {
    setShowCanvas(false);
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
          let audioElement = document.getElementById(
            "audio"
          ) as HTMLAudioElement;
          audioElement.src = (microphone.current?.saveRecord() as string) || "";
          audioElement.controls = true;
          microphone.current.mediaRecorder?.stop();
        }
      }, 1000);

      return () => {
        clearTimeout(timeout_1);
        clearTimeout(timeout_2);
      };
    }
  }, []);

  // const stopRecording = React.useCallback(() => {
  //   if (audioStream) {
  //     audioStream.getTracks().forEach((track) => {
  //       track.stop();
  //     });

  //     audioBlob.current = new Blob(audioChunks, { type: "audio/mp3" });

  //     if (stopRecordSignal) {
  //       let audioElement = document.getElementById("audio") as HTMLAudioElement;
  //       console.log(audioElement);
  //       audioElement.src = window.URL.createObjectURL(audioBlob.current);
  //       audioElement.controls = true;

  //       setAudioUrl(window.URL.createObjectURL(audioBlob.current));
  //     }
  //   }
  // }, [audioChunks, audioStream, stopRecordSignal]);

  // Function to save the recorded audio
  const saveRecording = () => {
    // const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
    const urlString = microphone.current?.saveRecord() as string;
    // console.log(urlString);
    setAudioUrl(urlString);
    let downloadLink = document.createElement("a");
    downloadLink.href = urlString;
    // console.log(audioBlob);
    // console.log(window.URL.createObjectURL(audioBlob));
    downloadLink.setAttribute("download", "audio");
    downloadLink.click();
    // You can save or upload the audioBlob as needed.
  };

  const init = () => {
    setShowRecordStatus(false);
    setStopRecordSignal(false);
    setEnanbleStopBtn(true);
    setProgress(1);
  };

  const transcriptRecord = async () => {
    const text = await microphone.current?.transcripeAudio();
    console.log(text);
  };

  const iflyServicePost = async () => {
    //https://raasr.xfyun.cn/v2/api/upload?duration=200&signa=Je5YsBvPcsbB4qy8Qvzd367fiv0%3D&fileName=%E9%98%B3%E5%85%89%E6%80%BB%E5%9C%A8%E9%A3%8E%E9%9B%A8%E5%90%8E.speex-wb&fileSize=11895&sysDicts=uncivilizedLanguage&appId=3e79d91c&ts=1662101767
    const config = {
      appid: "215170db",
      apiSecret: "bca2efef633d6d6199507d38747013a4",
    };
    // HmacSHA1(MD5(appid + ts)，secretkey)
    const date = new Date();
    const dateChuo = Number(date).toString();
    const baseString = config.appid + dateChuo;
    const md5 = Md5.hashStr(baseString);
    console.log(md5);
    const hmacssha1 = CryptoJS.HmacSHA1(md5, config.apiSecret);
    const signature = CryptoJS.enc.Base64.stringify(hmacssha1);
    const blob = new Blob(microphone.current?.audioChunks, {
      type: "audio/mp3",
    });
    const fileName = "audio.mp3";
    const fileSize = blob.size;

    const url = `/upload?duration=200&signa=${signature}&fileName=${fileName}&fileSize=${fileSize}&appId=${config.appid}&ts=${dateChuo}`;
    // const url = `/upload?duration=200&signa=${signature}&fileName=${fileName}&fileSize=${fileSize}&appId=${config.appid}&ts=${dateChuo}`
    // console.log(url);
     // console.log(blob)
    await axios
      .post(url, blob, {
        headers: {
          "Content-Type": "audio/mp3",
        },
      })
      .then((res) => {
        if (res.status === 200 && res.data["descInfo"] === "success") {
          //https://raasr.xfyun.cn/v2/api/getResult?signa=Wv23VLOg%2F6sQ1BDx4DKnnxtgiwQ%3D&orderId=DKHJQ2022090217220902175209AAEBD000015&appId=3e79d91c&resultType=predict&ts=1662112340

         console.log("iflyResponse:",res);


          const postInfo:PostProps ={
            ts: dateChuo,
            signa: signature,
            orderId: res.data["content"]["orderId"],
            appId: config.appid,
            resultType: "transfer",
            url: url,
          }

          setPostInfo(postInfo);
          
          console.log("postInfo:",postInfo);

          fetch('http://localhost:8000/api/iflyInfo/',{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify(postInfo),
          })
          .then(res=>{
            console.log(res)
            return res.json()
          })
          .then(data=>console.log("post to DB:",data))
          .catch(err=> console.log(err))
        } 
      })
      .catch((err) => console.log(err));
  };

  const iflyServiceGet = async () => {
    //https://raasr.xfyun.cn/v2/api/getResult?signa=Wv23VLOg%2F6sQ1BDx4DKnnxtgiwQ%3D&orderId=DKHJQ2022090217220902175209AAEBD000015&appId=3e79d91c&resultType=predict&ts=1662112340
    const url = `/getResult?signa=${postInfo.signa}&orderId=${postInfo.orderId}&appId=${postInfo.appId}&resultType=${postInfo.resultType}&ts=${postInfo.ts}`;
    console.log(postInfo);

    axios
      .post(url, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        const tmp = res.data.content.orderResult
        console.log(tmp)
        // const dataLayer00 = res.data.content.orderResult['lattice2'][0]['json_1best']['st']['rt'][0]['ws'];
        // console.log("dataLayer00:",dataLayer00)
  
        // dataLayer00.forEach((data:Dataprops)=>{
        //   setReturnText(prev=>[...prev,data.cw[0].w])
        //   // console.log(data.cw[0].w);
        // })


        // console.log(returnText);
      })
      .catch((err) => console.log(err));
  };


  React.useEffect(() => {
    setAmountProgress(timeCountDown);
    if (showRecordStatus) {
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress === amountProgress) {
            setStopRecordSignal(true);
            stopRecording();
            setEnanbleStopBtn(false);
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
  }, [amountProgress, showRecordStatus, stopRecordSignal, stopRecording]);

  return (
    <div>
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
                  0{Math.floor((amountProgress - progress) / 60)}:
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
              {stopRecordSignal ? (
                <Grid item xs={12} md={12}>
                  <Typography>
                    <audio id="audio" controls src={audioUrl}></audio>
                  </Typography>
                </Grid>
              ) : null}

              <Button onClick={iflyServicePost}> Upload</Button>

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
            <Button onClick={iflyServiceGet}> GetResult</Button>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
                marginTop: "5%",
              }}
            >
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
                onClick={() => {
                  if (showRecordStatus) {
                    setStopRecordSignal(true);
                    stopRecording();
                    setEnanbleStopBtn(false);
                  } else {
                    setStopRecordSignal(false);
                    startRecord();
                  }
                }}
                disabled={!enableStopBtn}
              >
                <StopIcon
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
              </IconButton>

              {/* close micrecord button */}
              <IconButton
                onClick={() => {
                  setShowRecordStatus(false);
                  setOpen(false);
                }}
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
