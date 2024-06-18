import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export const HeadPage = () => {
  return (
    <Box
      sx={{
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        color: "white",
        padding: "10px",
        // opacity:0.8,
      }}
      className="headpage-card"
    >
      <Grid container spacing={1}>
        <Grid item xs={12} md={5} sx={{display:"flex",justifyContent:{xs:"center",md:"flex-end"},}}>
          <Typography
            // variant="p"
            component="h6"
            sx={{
              backgroundColor: "white",
              color: "black",
              padding: "5px 10px",
              borderRadius: "5px",
              fontFamily: "display,sans-serif",
              // width:{md:"40%",xs:"60%"},
              fontSize:{md:"1rem",xs:"0.8rem"}
            }}
          >
            AudioPen Prime
          </Typography>
        </Grid>
        <Grid item xs={12} md={7} sx={{display:"flex",justifyContent:{xs:"center",md:"flex-start"},}}>
          <Typography
            // variant="p"
            component="h6"
            sx={{
              color: "white",
              padding: "5px 10px",
              fontFamily: "display,sans-serif",
              // width:"100%",
              fontSize:{md:"1rem",xs:"0.8rem"}
            }}
          >
            If you like AudioPen, you'll love AudioPen Prime.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
