import React from "react";

import { Grid } from "../elements";
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import { history } from "../redux/configureStore";

import Post from "../components/Post";
import EditButtons from "../components/EditButtons";

const PostDetail = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);

  const id = props.match.params.id;
  let _postIdx;
  post_list.map((p, idx) => {
    if (p.postId === parseInt(id)) {
      _postIdx = idx;
    }
  });

  const post = post_list[_postIdx];

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
            <EditButtons {...post} />
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
