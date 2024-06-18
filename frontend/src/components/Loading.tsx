import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

type LoadingProps = {
  message: string;
  amount?: number;
};

export default function  Loading({message,amount=10}:LoadingProps) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {   

    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{p:3,m:3,minHeight:"200px",minWidth:"300px"}}>
      <Container sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"30px"}}>
        <CircularProgress variant="determinate" value={progress} />
        <Typography variant="body2" sx={{color:"white"}}>{progress.toFixed(0)}%</Typography>
        <Typography variant="body2" sx={{color:"white"}}>{message}</Typography>
        <Typography variant="body2" sx={{color:"white"}}>如果超过{amount}秒未返回数据，请刷新页面</Typography>
      </Container>
    </Box>
  );
};


export function DotAnimation(){
  return <Box>
    <Container>
      ...
    </Container>
  </Box>
}

