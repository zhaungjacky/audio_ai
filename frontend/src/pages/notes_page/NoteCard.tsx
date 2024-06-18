import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { NoteTypeProps } from "../../constants/props";

type NoteCardTypes = {
  note: NoteTypeProps;
  idx: number;
  handleClick: (index: number) => void;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NoteCard(props: NoteCardTypes) {
  const { note, idx, handleClick } = props;
  return (
    <Card sx={{ maxWidth: 345, borderRadius: "20px" }}>
      <CardActionArea
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(idx)}
        sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <CardHeader
          sx={{ fontSize: { md: "1rem", sm: "0.8rem", xs: "0.7rem" } }}
          // action={
          //   <IconButton aria-label="settings">
          //     <TextSnippetIcon />
          //   </IconButton>  
          // }
          title={note.title}
          subheader={new Date(note.created_at!).toLocaleDateString()}
        />
        <CardContent>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontSize: { md: "1.5rem", sm: "1.2rem", xs: "1rem" } }}
          >
            {note.trans_res}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
