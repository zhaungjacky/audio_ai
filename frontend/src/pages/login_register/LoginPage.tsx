import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RegisterPage from "./RegisterPage";

const LoginPage = () => {
  const { user, loginUser } = useAuth();
  const navigate = useNavigate();
  const [toggleLogin, setToggleLogin] = useState(true); //default show login page

  const [username_local, setUsername_local] = useState<string | null>(() =>
    localStorage.getItem("username_local")
      ? JSON.parse(localStorage.getItem("username_local")!)
      : null
  );

  const handleTogglePage = () => setToggleLogin((prev) => !prev);

  const handleLogin = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    loginUser(e);
    const formDate = new FormData(e.currentTarget)
    localStorage.setItem("username_local",JSON.stringify(formDate.get("username")))
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <Container>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {toggleLogin ? (
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontFamily: "monospace" }}
            >
              述而作
            </Typography>
            <Box
              component="form"
              onSubmit={handleLogin}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="user"
                label="用户名"
                name="username"
                autoComplete="user"
                autoFocus
                defaultValue={username_local}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="密码"
                type="password"
                id="password"
                autoComplete="current-password"
                defaultValue=""
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                登录
              </Button>
              {/* <Link to={"/register"}> */}
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleTogglePage}
              >
                注册
              </Button>
              {/* </Link> */}
            </Box>
          </Box>
        ) : (
          <RegisterPage handleTogglePage={handleTogglePage} setUsername_local={setUsername_local} />
        )}
        <CssBaseline />
      </Container>
    </Container>
  );
};

export default LoginPage;
