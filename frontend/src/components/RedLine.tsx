import Box from '@mui/material/Box';

interface RedlineInterface {
    width: string;
    height:string;
    background?: string;
}

const RedLine = (props: RedlineInterface) => {
    const {width,height,background } = props;
  return (
    <Box
    sx={{
      width: width,
      height: height,
      background: background ?? "red",
      borderRadius: "2px",
      margin: "0px auto",
    }}
  ></Box>
  )
}

export default RedLine