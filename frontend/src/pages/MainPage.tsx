import Box from "@mui/material/Box";
import React from "react";
import TopContent from "./top/TopContent";
import UserCases from "./mid/UserCases";
import FAQsPage from "./mid/FAQsPage";
import { MainpageHtmlProps, NoteTypeProps } from "../constants/props";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import NotesPage from "./notes_page/NotesPage";

//main page
const MainPage = () => {
  const { mainPageData, user, authTokens,getAudioContext } = useAuth();
  const navigator = useNavigate();
  const [initData, setInitData] = React.useState<MainpageHtmlProps>();
  const [showNotes, setShowNotes] = React.useState(false);

  //get mainPage data from context or server
  React.useEffect(() => {
    if (mainPageData) {
      setInitData(mainPageData);
    } else {
      fetch("/api/mainpage-content/")
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          if (data) {
            setInitData(data[0]);
          }
        });
    }
  }, [mainPageData]);

  // if user have notes redirect notespage
  React.useEffect(() => {
    if (user?.user_id) {
      fetch("/api/user-notes/" + user?.user_id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + String(authTokens?.access),
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data: NoteTypeProps[]) => {
          if (data !== undefined && data !== null && data.length > 0) {
            setShowNotes(true);
          }
        });
    }
  }, [authTokens?.access, navigator, user?.user_id]);

  // no notes add note open notes pages

  React.useEffect(() => {
    if(user?.user_id){
      if(getAudioContext?.ori){
        setShowNotes(true);
      }
    }
  }, [getAudioContext?.ori, user?.user_id]);

  if (!initData) {
    return (
      <>
        <Loading message="Loading data..." />
      </>
    );
  } else {
    return (
      <Box sx={{ height: "100%", marginBottom: "130px" }}>
        {/* <HeadPage title={initData?.title} /> */}

        <TopContent
          top_0={initData.top_0}
          top_1={initData.top_1}
          top_2={initData.top_2}
        />

        {showNotes ? (
          <NotesPage />
        ) : (
          <>
            <UserCases mid={initData.mid_0} />
            <FAQsPage mid={initData.mid_1} />
          </>
        )}

        {/* <UserComments /> */}
      </Box>
    );
  }
};

export default MainPage;
