import React from "react";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "../elements";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";

const PostDetail = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  console.log(post_list);

  const id = props.match.params.id;
  console.log(id);
  const post = post_list.find((p) => {return p});
  console.log(post)

  React.useEffect(() => {
    if (post) {
      return;
    }
    dispatch(postActions.getOnePostFB(id));
  }, []);

  return (
    <React.Fragment>
      {post && (
        <>
          <Post {...post} is_me={true} />
          {true ? (
            <Box
              sx={{
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
            <Grid center>
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
