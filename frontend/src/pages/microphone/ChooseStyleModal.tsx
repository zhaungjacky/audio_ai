import React from "react";
import NoteIcon from "@mui/icons-material/Note";
import MessageIcon from "@mui/icons-material/Message";
import EmailIcon from "@mui/icons-material/Email";
import ListIcon from "@mui/icons-material/List";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { RecordMountProps } from "./MicRecordPage_tn";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import { ChooseStylesProps } from "../../constants/props";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import Loading from "../../components/Loading";

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
  // overflow:"scroll",
};

const ChooseStyleModal = (props: RecordMountProps) => {
  const { open, setOpen, setSelectedType } = props;

  const { chooseStyleData } = useAuth(); // chooseStyle data source
  const [initData, setInitData] = React.useState(chooseStyleData); // store in data
  const [selectIndex, setSelectIndex] = React.useState<number>(-1); // inital array title index

  //show upload button to upload audio
  const [showBtn, setShowBtn] = React.useState(false);

  //loading circle
  const [openLoading, setOpenLoading] = React.useState(false);

  // initial choosestyle options
  React.useEffect(() => {
    if (!chooseStyleData) {
      axios
        .get("/api/style-types/")
        .then((res) => {
          if (res.status === 200) {
            const tmp = res.data as ChooseStylesProps[];
            setInitData(tmp);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [chooseStyleData]);

  const handleClose = () => setOpen(false);

  //click the card to select style type
  const handleClick = (index: number) => {
    if (initData) {
      setSelectIndex(index);
      if (!showBtn) {
        setShowBtn(true);
      }
    }
  };

  //upload audio button
  const handleUploadBtn = () => {
    if (selectIndex > -1 && initData && setSelectedType) {
      const val = initData[selectIndex].title ?? null;
      if (val) {
        setSelectedType(val);
        setOpenLoading(true);
      }
    }
  };

  const icons = [
    { icon: <NoteIcon color="primary" fontSize="large" /> },
    { icon: <MessageIcon color="secondary" fontSize="large" /> },
    { icon: <EmailIcon color="success" fontSize="large" /> },
    { icon: <ListIcon color="warning" fontSize="large" /> },
    { icon: <MenuBookIcon color="info" fontSize="large" /> },
    { icon: <NewspaperIcon color="error" fontSize="large" /> },
  ];

  if (!initData) return <>Loading...</>;
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
        <Container sx={style}>
          {!openLoading ? (
            <Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  sx={{ color: "white", marginTop: "20px" }}
                >
                  为您的笔记选择书写风格
                </Typography>
              </Box>
              <Box sx={{ overflowY: "scroll" }}>
                <Box>
                  {initData.map((item, index) => {
                    const bg_color =
                      selectIndex === index ? "lightgrey" : "white";
                    return (
                      <Card
                        key={item.id}
                        sx={{
                          paddingX: "16px",
                          margin: "10px 20px",
                          borderRadius: "20px",
                          height: "100%",
                          background: bg_color,
                          // "&:hover":{background:"gray"},
                          // "&:hover":{background:"rgba(223,213,211,0.8)"},
                        }}
                      >
                        <CardActionArea
                          onClick={() => handleClick(index)}
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            margin: 0,
                            padding: "6px 0",
                          }}
                        >
                          <CardActions
                            sx={{
                              margin: 0,
                              padding: "0 16px 0 0",
                              fontSize: { md: "1rem", sm: "0.5rem" },
                            }}
                          >
                            {icons[index]["icon"]}
                          </CardActions>
                          <CardContent sx={{ margin: 0, padding: 0 }}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="div"
                              sx={{ margin: 0, padding: 0 }}
                            >
                              {item.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ margin: 0, padding: 0 }}
                            >
                              {item.context}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    );
                  })}
                </Box>
              </Box>

              <Box sx={{ textAlign: "center", margin: "20px" }}>
                {showBtn ? (
                  <Button
                    onClick={handleUploadBtn}
                    variant="text"
                    color="warning"
                    sx={{
                      color: "white",
                      border: "1px solid white",
                      borderRadius: "16px",
                      padding: "8px 28px",
                      width: "50%",
                    }}
                  >
                    执行{initData[selectIndex].title}
                  </Button>
                ) : null}
              </Box>
            </Box>
          ) : (
            <Loading message="服务器返回数据中..." amount={10}/>
          )}
        </Container>
      </Modal>
    </div>
  );
};

export default ChooseStyleModal;
