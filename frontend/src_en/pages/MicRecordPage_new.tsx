import React, { useCallback, useRef } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import StopIcon from "@mui/icons-material/Stop";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import DownloadIcon from "@mui/icons-material/Download";
import MicVisualizer from "./MicVisualizer";
import { Microphone } from "./MicrophoneClass";

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

const HandleRecordMount = (props: RecordMountProps) => {
  const { open, setOpen } = props;
  // const [audioStream, setAudioStream] = React.useState<MediaStream | null>(
  //   null
  // );
  // const [audioChunks, setAudioChunks] = React.useState<Blob[]>([]);
  const [amountProgress, setAmountProgress] = React.useState(180);
  const [progress, setProgress] = React.useState(1);
  const [showRecordStatus, setShowRecordStatus] = React.useState(false); // start record -> true
  const [audioUrl, setAudioUrl] = React.useState("");
  const [stopRecordSignal, setStopRecordSignal] = React.useState(false);
  const [showCanvas, setShowCanvas] = React.useState(false);

  // let audioBlob = useRef<Blob>();

  let microphone = useRef<Microphone | null>(null);

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

          // const mediaRecorder = new MediaRecorder(stream);
          // const audioContext = new AudioContext();
          // const microphone = audioContext.createMediaStreamSource(stream);
          // const analyser = audioContext.createAnalyser();
          // analyser.fftSize = 512;
          // const bufferLength = analyser.frequencyBinCount;
          // const dataArray = new Uint8Array(bufferLength);
          // microphone.connect(analyser);

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
  const stopRecording = useCallback(() => {
    setShowCanvas(false);
    if (microphone.current) {
      microphone.current.stopRecord();
      setTimeout(() => {
        if (microphone.current !== null) {
          microphone.current.stopRecord();
        }
      }, 500);

      // set aduio element src url
      setTimeout(()=>{
        if (microphone.current) {
          let audioElement = document.getElementById(
            "audio"
          ) as HTMLAudioElement;
          audioElement.src = microphone.current?.saveRecord() as string;
          audioElement.controls = true;
        };
      },1000);
    }
  }, []);
  // const stopRecording = useCallback(() => {
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

  React.useEffect(() => {
    if (showRecordStatus) {
      const timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= amountProgress ? amountProgress : prevProgress + 1
        );
      }, 1000);

      setAmountProgress((prev) => prev);
      if (stopRecordSignal) {
        clearInterval(timer);
      }
      return () => {
        clearInterval(timer);
      };
    }
  }, [amountProgress, audioUrl, showRecordStatus, stopRecordSignal]);

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
            <Grid container spacing={1}
              sx={{
                // height: "22vh",
                // marginBottom: {md:"30px",xs:"10px"},
                textAlign: "center",
                justifyItems: "center",
                display:"block",
                margin:"10px auto"
              }}
            >
              {/* time circle */}
              <Grid item xs={12} md={12}>

              <CircularProgress
                variant="determinate"
                value={(progress / amountProgress) * 100}
                sx={{ margin: "10px auto", color: "white"}}
              />
              </Grid>

              {/* time countdown */}
              <Grid item xs={12} md={12}>

              <Typography
                sx={{
                  fontSize: {md:"1.5rem",xs:"1rem"},
                  color: "white",
                  fontFamily: "Fraunces",
                }}
              >
                0{Math.floor((amountProgress - progress) / 60)}:
                {(amountProgress - progress) % 60}
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

              {/* stop and download button */}
              <Grid item xs={12} md={12}>
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
                    stop
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
              </Grid>
              
              {/* divider divide the record status and original text */}
              <Grid item xs={12} md={12}>                
                <Divider
                  sx={{
                    color: "white",
                    fontSize: "0.8rem",
                    paddingTop: "20px",
                  }}
                >
                  Please wait for the progress complete
                </Divider>
              </Grid>
            </Grid>
          ) : null}

          {/* first show message and start/stop/close button */}
          <Box sx={{ height: "20%" }}>
            <Typography
              // variant="h6"
              sx={{
                margin: {md:"80px auto 0",xs:"40px auto 0"},
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "0.8rem",
              }}
            >
              Not sure what to say?
            </Typography>

            <Typography
              sx={{ textAlign: "center", color: "white", fontSize: "0.7rem" }}
            >
              Try talking about what you want to get done this week.
            </Typography>
            <Typography
              sx={{ fontSize: "0.7rem", textAlign: "center", color: "white" }}
            >
              Don't be afraid to ramble!
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
                marginTop: "5%",
              }}
            >
              <IconButton sx={{ marginLeft: 4, paddingBottom: 2 }}>
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

              <IconButton
                sx={{ margin: 0 }}
                onClick={startRecord}
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
