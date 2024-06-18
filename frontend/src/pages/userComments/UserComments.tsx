import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";

type UserContentProps = {
  score: number;
  comment: string;
  url?: string;
  id:number;
};

const userInfo: UserContentProps[] = [
  {
    id:1,
    score: 5,
    comment:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat, accusantium? Assumenda eum nemo vel praesentium quibusdam.",
    url: "https://senjaio.b-cdn.net/public/media/DfGR81ZLzq2kpPaFXeZzcNV3.jpeg?width=100&height=100",
  },
  {
    id:2,
    score: 5,
    comment:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat, accusantium? Assumenda eum nemo vel praesentium quibusdam.",
    url: "https://senjaio.b-cdn.net/public/media/T7Uv95gSQrAT2nyVqqs0zCgN.jpeg?width=100&height=100",
  },
  {
    id:3,
    score: 4,
    comment:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo laborenulla repellat molestiae, veritatis qui asperiores repellendus!",
    url: "https://senjaio.b-cdn.net/public/media/Ep1V9NrZOVjolihxoSlJpWCT.jpeg?width=100&height=100",
  },
  {
    id:4,
    score: 5,
    comment: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    url: "https://senjaio.b-cdn.net/public/media/siAm9AcHRu9qa2MlTYBZVzZQ.jpeg?width=100&height=100",
  },
  {
    id:5,
    score: 5,
    comment:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet, obcaecati.",
    url: "https://senjaio.b-cdn.net/public/media/NXfCSf6d9N73BajbJN6NNzg1.jpeg?width=100&height=100",
  },
  {
    id:6,
    score: 4.5,
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, qui sed.",
    url: "https://senjaio.b-cdn.net/public/media/gRYFHCnHYepuMvQTH3vC0lvk.jpeg?width=100&height=100",
  },
  {
    id:7,
    score: 4.5,
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, qui sed.",
    url: "https://senjaio.b-cdn.net/public/media/gRYFHCnHYepuMvQTH3vC0lvk.jpeg?width=100&height=100",
  },
  {
    id:8,
    score: 4.5,
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, qui sed.",
    url: "https://senjaio.b-cdn.net/public/media/gRYFHCnHYepuMvQTH3vC0lvk.jpeg?width=100&height=100",
  },
  {
    id:9,
    score: 4.5,
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, qui sed.",
    url: "https://senjaio.b-cdn.net/public/media/gRYFHCnHYepuMvQTH3vC0lvk.jpeg?width=100&height=100",
  },
  {
    id:10,
    score: 4.5,
    comment:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, qui sed.",
    url: "https://senjaio.b-cdn.net/public/media/gRYFHCnHYepuMvQTH3vC0lvk.jpeg?width=100&height=100",
  },
];

export const UserComments = () => {
  return (
    <Grid container spacing={1}>
      {userInfo.map((user) => (
        <Grid item xs={12} sm={6} md={3} lg={2} key={user.id} sx={{display:"flex",justifyContent:"center",}}>
          <Card sx={{ maxWidth: "345px" }} >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "red[500]" }} aria-label="recipe">
                  <img src={user.url} alt="404" />
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="User random"
              subheader="@random user"
            />
            <Rating name="read-only" value={user.score} precision={0.5} readOnly />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {user.comment}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
