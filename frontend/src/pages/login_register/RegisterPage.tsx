import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type RegisterPageProps = {
  handleTogglePage: () => void;
  username_local?:string,
  setUsername_local: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function RegisterPage({ handleTogglePage,setUsername_local }: RegisterPageProps) {
  const [msg, setMsg] = useState<string | null>(null);
  const [statusText, setStatusText] = useState<boolean>(false);
  // const navigate = useNavigate();

  const registerUser = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const obj = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      email: formData.get("email") as string,
      //   is_active: false,
    };

    // The username must contain only letters, numbers, underscores, or hyphens.
    // It must be between 3 and 10 characters in length.
    const username_pattern = /^[a-zA-Z0-9_-]{3,10}$/;

    // The password must contain at least one lowercase letter, one uppercase letter, one digit,
    // and can include special characters from the provided set.
    // It must be at least 8 characters long.
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\-]{8,}$/;

    if (!username_pattern.test(obj.username.trim())) {
      alert("用户名字符为3-10位，且只能包含数字，字母及-，_，请您核对");
      return;
    }

    if (!passwordPattern.test(obj.password.trim())) {
      alert("密码最少8位，且至少包含一位大写，一位小写及一位数字，请您核对！");
      return;
    }

    const password_confirm = formData.get("password-confirm") as string;

    if (!obj.username || !obj.password || !password_confirm || !obj.email) {
      alert("要素不全!");
      return;
    } else if (obj.password !== password_confirm) {
      alert("密码不一致");
      return;
    } else if (!obj.email.includes("@")) {
      alert("邮箱地址错误");
      return;
    }

    try {
      fetch("/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            setMsg(res.statusText);
          }
        })
        .then((data) => {
          if (data !== undefined && data !== null) {
            setStatusText(true);
            let info = `用户:<-${data.username}->注册成功!`;
            setMsg(info);
            localStorage.setItem("username_local",JSON.stringify(data.username))
            setUsername_local(data.username)
            const timer = setTimeout(() => {
              handleTogglePage();
            }, 1000);
            return () => clearTimeout(timer);
          } 
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
          <Typography component="h1" variant="h5">
            项目工程部
          </Typography>
          <Box
            component="form"
            onSubmit={registerUser}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="用户"
              name="username"
              autoComplete="user"
              autoFocus
              defaultValue=""
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password-confirm"
              label="确认密码"
              type="password"
              id="password-confirm"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="邮箱"
              type="email"
              id="email"
              autoComplete="current-email"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              注册
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleTogglePage}
            >
              登录
            </Button>
            {msg ? (
              <Typography color={statusText ? "secondary" : "error"}>
                {msg}
              </Typography>
            ) : null}
          </Box>
        </Box>
      </Container>
    </Container>
  );
}
