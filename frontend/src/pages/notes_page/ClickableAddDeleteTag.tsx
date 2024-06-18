import * as React from "react";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import AddIcon from "@mui/icons-material/Add";

type OperationType = {
  addOrDelete: boolean;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  defautleTags: string[];
  setDefautleTags: React.Dispatch<React.SetStateAction<string[]>>;
  setClipboardStatus: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
};

export default function ClickableAddDeleteTag({
  addOrDelete,
  tags,
  setTags,
  defautleTags,
  setDefautleTags,
  setClipboardStatus,
}: OperationType) {
  const handleClick = (index: number) => {
    if (addOrDelete) {
      // console.log(defautleTags[index])

      if (tags.indexOf(defautleTags[index]) === -1) {
        setTags((prev) => [...prev, defautleTags[index]]);
      } else {
        setClipboardStatus("存在相同标签");
        const timer = setTimeout(() => {
          setClipboardStatus(null);
        }, 1000);
        return () => clearTimeout(timer);
      }

      setDefautleTags((prev) =>
        prev.filter((item) => item !== defautleTags[index])
      );
    } else {
      if (defautleTags.indexOf(tags[index]) === -1) {
        setDefautleTags((prev) => [...prev, tags[index]]);
      } else {
        setClipboardStatus("存在相同标签");
        const timer = setTimeout(() => {
          setClipboardStatus(null);
        }, 1000);
        return () => clearTimeout(timer);
      }

      setTags((prev) => prev.filter((item) => item !== tags[index]));
    }
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          {addOrDelete
            ? // 默认标签,用于点击添加至用户标签,同时默认标签删除对影项次
              defautleTags.map((tag, index) => (
                <Grid item xs={6} sm={4} md={3} lg={3} xl={2} key={String(tag)}>
                  <Chip
                    label={tag}
                    onClick={() => handleClick(index)}
                    onDelete={() => handleClick(index)}
                    deleteIcon={<AddIcon color="error" />}
                    color="success"
                    size="small"
                    sx={{ minWidth: "66px" }}
                  />
                </Grid>
              ))
            : //用户标签,点击删除,同时默认标签增加标签
              tags.map((tag, index) => {
                if (tag) {
                  return (
                    <Grid
                      item
                      xs={6}
                      sm={4}
                      md={3}
                      lg={3}
                      xl={2}
                      key={String(tag)}
                    >
                      <Chip
                        label={tag}
                        // onClick={() => handleClick(index)}
                        onDelete={() => handleClick(index)}
                        // deleteIcon={<DeleteIcon color='error'/>}
                        color="primary"
                        size="small"
                        sx={{ minWidth: "66px" }}
                      />
                    </Grid>
                  );
                } else {
                  return null;
                }
              })}
        </Grid>
      </Container>
    </Box>
  );
}
