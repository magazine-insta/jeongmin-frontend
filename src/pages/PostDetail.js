import React from "react";

import { Grid } from "../elements";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import { history } from "../redux/configureStore";

import Post from "../components/Post";

const PostDetail = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  console.log(user_info);

  const id = props.match.params.id;
  console.log(id);
  const post = post_list[0];
  console.log(post);

  React.useEffect(() => {
    if (post) {
      return;
    }
    dispatch(postActions.getOnePostAxios(id));
  }, []);

  return (
    <React.Fragment>
      {post && (
        <>
          <Post {...post} is_me={post.nickname === user_info?.nickname} />
          {post.nickname === user_info?.nickname ? (
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
              <ButtonGroup
                color="secondary"
                aria-label="medium secondary button group"
              >
                <Button
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  메인으로
                </Button>
                <Button
                  onClick={() => {
                    history.push(`/write/${id}`);
                  }}
                >
                  수정하기
                </Button>
                <Button
                  onClick={() => {
                    dispatch(postActions.deletePostAxios(id));
                  }}
                >
                  삭제하기
                </Button>
              </ButtonGroup>
            </Box>
          ) : (
            <Grid center padding="16px 0px">
              <Button
                variant="outlined"
                onClick={() => {
                  history.push("/");
                }}
              >
                메인으로
              </Button>
            </Grid>
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default PostDetail;
