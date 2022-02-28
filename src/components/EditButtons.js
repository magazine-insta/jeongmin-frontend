import React from "react";

import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";

const EditButtons = (props) => {
    const dispatch = useDispatch();
    console.log(props)


  return (
    <Box
      sx={{
        padding: "16px 0px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup color="secondary" aria-label="medium secondary button group">
        <Button
          onClick={() => {
            history.push("/");
          }}
        >
          메인으로
        </Button>
        <Button
          onClick={() => {
            history.push(`/write/${props.postId}`);
          }}
        >
          수정하기
        </Button>
        <Button
          onClick={() => {
            dispatch(postActions.deletePostAxios(props.id));
          }}
        >
          삭제하기
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default EditButtons;
