import React from "react";
import { NoteTypeProps, UserStatusType } from "../../constants/props";
import { useAuth } from "../../context/AuthContext";
import useFetch from "../../hook/useFetch";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import NoteCard from "./NoteCard";
import NoteModal from "./NoteModal";
import Loading from "../../components/Loading";


const NotesPage = () => {
  const { user, getAudioContext } = useAuth();

  //get user notes data from server
  const { data: notesDataServer } = useFetch<NoteTypeProps[]>(
    "/api/user-notes/" + user?.user_id,
    true
  );
  // after get data from server  keep it in state
  const [notes, setNotes] = React.useState<NoteTypeProps[]>(
    [] as NoteTypeProps[]
  );

  // get user_status from server determain wheather he can add tags or other
  const { data: user_status } = useFetch<UserStatusType>(
    "/api/user-status/" + user?.user_id,
    true
  );

  //determain wheather open modal
  const [openModal, setOpenModal] = React.useState<boolean>(false); //()=> getAudioContext == null

  // signal data prop to modal
  const [context_props, setContext_props] =
    React.useState<NoteTypeProps | null>();

  //determian modal delete icon's action
  const [newContext, setNewContext] = React.useState(false);

  // user notes limit if not prime limit = 10

 const [notesLimit,setNotesLimit] = React.useState<number>(user_status?.prime?10000:10); 

  // display singal user note card
  const handClickCard = (index: number) => {
    setContext_props(notes[index]); //set props to the modal
    setOpenModal(true);
    setNewContext(false);
  };

  //initial page if user have notes data show note cards or show original mainpage
  React.useEffect(() => {
    //set noteslimit
    if(user_status?.prime){
      setNotesLimit(10000);
    }
    //set data to display note cards
    if (notesDataServer) {
      setNotes(notesDataServer);
    }    
    setNewContext(false); // mark modal's note type  if new context  then deleteIcon only close modal page or delete note from server

    //set getAudioContext after this props into notemodal
    if (getAudioContext?.ori !==undefined) {
      const obj = {
        id:"newContext",
        userStatus: user_status,
        title: getAudioContext.title,
        ori: getAudioContext.ori,
        trans_res: getAudioContext.trans_res,
        tag_0: "",
        tag_1: "",
        tag_2: "",
        tag_3: "",
        tag_4: "",
        tag_5: "",
        created_at: new Date().toLocaleDateString(),
        file_name:getAudioContext?.file_name,
      } as NoteTypeProps;
      setContext_props(obj);
      setNewContext(true);
      setOpenModal(true);
    }
  }, [getAudioContext, notesDataServer, user_status]);

  
  if (!notes) return (
    <Container>
      <Box>
        <Loading message="loading..."/>
      </Box>      
    </Container>
  );

  return (
    <Box>
      <Container sx={{ margin: "20px auto", padding: "20px 50px" }}>
        <Box>
          {openModal ? (
            <NoteModal
              open={openModal}
              setOpen={setOpenModal}
              context_props={context_props!}
              user_status={user_status!}
              newContext={newContext}
              notes={notes}
              setNotes={setNotes}
              notesLimit={notesLimit}
            />
          ) : null}
        </Box>
        <Box>
          <Box>
            <Typography variant="h4" sx={{marginY:"20px",letterSpacing:"2px"}}>{"{  "}{notes.length} / {notesLimit} {"  }"}</Typography>
          </Box>
          <Box >
            <Box sx={{marginY:"20px"}}>
              <Divider >您的笔记</Divider>
            </Box>
          </Box>
          <Box >
            <Grid container spacing={4}>
              {notes?.map((note, index) => {
                if(index < notesLimit) {
                  return (
                    <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={note.id}>
                      <NoteCard
                        note={note}
                        idx={index}
                        handleClick={handClickCard}
                      />
                    </Grid>
                  );
                  } else {
                    return null
                  }
              })}
            </Grid>
          </Box>
          <Box >
            <Box sx={{marginY:"20px"}}>
              <Divider ></Divider>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default NotesPage;
