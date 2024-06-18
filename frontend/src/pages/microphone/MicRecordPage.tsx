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
import DownloadIcon from "@mui/icons-material/Download";
import MicVisualizer from "./MicVisualizer";
import { Microphone } from "./MicrophoneClass.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {md:"600px",xs:"95%"},
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
  const [audioStream, setAudioStream] = React.useState<MediaStream | null>(
    null
  );
  const [audioChunks, setAudioChunks] = React.useState<Blob[]>([]);
  const [amountProgress, setAmountProgress] = React.useState(180);
  const [progress, setProgress] = React.useState(1);
  const [showRecordStatus, setShowRecordStatus] = React.useState(false); // start record -> true
  const [audioUrl, setAudioUrl] = React.useState("");
  const [stopRecordSignal, setStopRecordSignal] = React.useState(false);
  let audioBlob = useRef<Blob>();

  const microphone = new Microphone();

  // Function to start recording audio
  const startRecording = () => {
    setShowRecordStatus(true);
    try {

      if(!navigator.mediaDevices) {
        alert("mic not authorized!");
        return;
      }
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          setAudioStream(stream);

          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
              setAudioChunks((prevChunks) => [...prevChunks, e.data]);
            }
          };
          mediaRecorder.start();

        })
        .catch((error) => {
          console.error("Error accessing microphone:", error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // Function to stop recording audio
  const stopRecording = useCallback(() => {
    
    if (audioStream) {
      audioStream.getTracks().forEach((track) => {
        track.stop();
      });
      
      audioBlob.current = new Blob(audioChunks, { type: "audio/mp3" });


      if (stopRecordSignal) {
        let audioElement = document.getElementById("audio") as HTMLAudioElement;
        console.log(audioElement);
        audioElement.src = window.URL.createObjectURL(audioBlob.current);
        audioElement.controls = true;

        setAudioUrl(window.URL.createObjectURL(audioBlob.current));
      }
    }
  },[audioChunks, audioStream, stopRecordSignal]);

  // Function to save the recorded audio
  const saveRecording = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
    setAudioUrl(window.URL.createObjectURL(audioBlob));
    let downloadLink = document.createElement("a");
    downloadLink.href =  window.URL.createObjectURL(audioBlob);
    console.log(audioBlob);
    console.log(window.URL.createObjectURL(audioBlob));
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
          {showRecordStatus ? 

          // start record
          (<Box
              sx={{
                height: "22vh",
                marginBottom: "50px",
                textAlign: "center",
                justifyItems: "center",
              }}
            >
              <CircularProgress
                variant="determinate"
                value={(progress / amountProgress) * 100}
                sx={{ margin: "20px auto", color: "white", scale: "1" }}
              />
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  color: "white",
                  fontFamily: "Fraunces",
                }}
              >
                0{Math.floor((amountProgress - progress) / 60)}:
                {(amountProgress - progress) % 60}
              </Typography>

              {/* micvisualizer */}
              <MicVisualizer microphone={microphone}/>

                {/* stop record */}
              {stopRecordSignal ? (
                <Typography>
                  <audio id="audio" controls src={audioUrl}></audio>
                </Typography>
              ) : null}

              <Box sx={{display:"flex", alignItems:"center",justifyContent:"center"}}>
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
                >
                  <DownloadIcon />
                </IconButton>
              </Box>
              <Divider
                sx={{
                  color: "white",
                  fontSize: "0.8rem",
                  paddingTop: "50px",
                }}
              >
                Please wait for the progress complete
              </Divider>
            </Box>
          ) : null}

          {/* first show message and start/stop/close button */}
          <Box sx={{ height: "20%" }}>
            <Typography
              // variant="h6"
              sx={{
                margin: "125px auto 0",
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
                onClick={() => {
                  startRecording();
                  if (showRecordStatus) {
                    setStopRecordSignal(true);
                    stopRecording();
                  }
                }}
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
                  stopRecording();
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
