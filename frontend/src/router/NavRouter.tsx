import { HashRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthProvider, useAuth } from "../context/AuthContext";
import LoginPage from "../pages/login_register/LoginPage";
import Footer from "../components/Footer";
import Divider from "@mui/material/Divider";
import PrimePage from "../pages/prime/PrimePage";
import { useState,useEffect } from "react";
import PageNotFound from "../components/PageNotFound";
import PurchasePrime from "../pages/prime/PurchasePrime";
import PrivacyPolicyPage from "../pages/footer_3_page/PrivacyPolicyPage";
import FAQsPage from "../pages/mid/FAQsPage";
import UserTermsPage from "../pages/footer_3_page/UserTermsPage";
import WorkProcessPage from "../pages/mid/WorkProcessPage";
import NotesPage from "../pages/notes_page/NotesPage";
import TopIconPage from "../pages/top/TopIconPage";
import BottomZone from "../pages/Bottom/BottomZone";
import { MainpageHtmlProps } from "../constants/props";


export type ThemeMode = "dark" | "light";

const NavRouter = () => {
  const { mainPageData } = useAuth();
  // console.log(mainPageData)
  const [mode, setMode] = useState<ThemeMode>(() =>
    localStorage.getItem("mode")
      ? JSON.parse(localStorage.getItem("mode")!)
      : "light"
  );

  const [mainPageData_confirm, setMainPageData] = useState<MainpageHtmlProps>( {} as MainpageHtmlProps );

  useEffect(() => {

    fetch('/api/mainpage-content/',{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then(res=>res.json())
    .then((data:MainpageHtmlProps[])=>{
      setMainPageData(data[0])
    })
    .catch(err=>console.log(err))

  }, [])
  

  const myTheme = createTheme({
    palette: {
      mode: mode,
      ochre: {
        main: "#E3D026",
        light: "#E9DB5D",
        dark: "#A29415",
        contrastText: "#242105",
      },
    },
  });

  return (
    <ThemeProvider theme={myTheme}>
      <Router >
        <AuthProvider >
          {/* {mainPageData?.title ? <TopIconPage title={mainPageData?.title} />:<TopIconPage title={"述而作"} />} */}
            <TopIconPage title={mainPageData_confirm.title} />
            <Routes>
              {/* mainpage */}
              <Route path="/">
                <Route index element={<MainPage />} />
              </Route>

              {/* loginpage */}
              <Route path="/login">
                <Route index element={<LoginPage />} />
              </Route>

              {/* view prime benifits */}
              <Route path="/prime">
                <Route index element={<PrimePage />} />
              </Route>

              {/* purchase prime */}
              <Route path="/purchase">
                <Route index element={<PurchasePrime />} />
              </Route>

              {/* workprocess */}
              <Route path="/workprocess">
                <Route index element={<WorkProcessPage />} />
              </Route>

              {/* notes page */}
              <Route path="/notes">
                <Route index element={<NotesPage />} />
              </Route>

              {/* privacy policy */}
              <Route path="/privacypolicy">
                <Route index element={<PrivacyPolicyPage />} />
              </Route>

              {/* faqs */}
              <Route path="/faqs">
                <Route index element={<FAQsPage mid={"常见问题"} />} />
              </Route>

              {/* terms */}
              <Route path="/terms">
                <Route index element={<UserTermsPage />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Divider sx={{ borderColor: "rgba(0,0,0,0.3)" }}></Divider>
            <BottomZone mode={mode} setMode={setMode} />
            <Footer />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

declare module "@mui/material/styles" {
  interface Palette {
    ochre: Palette["primary"];
  }

  interface PaletteOptions {
    ochre?: PaletteOptions["primary"];
  }
}

// Update the Button's color options to include an ochre option
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    ochre: true;
  }
}

export default NavRouter;
