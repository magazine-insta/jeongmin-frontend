// PostList.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as postActions } from "../redux/modules/post";

import { Grid, Button } from "../elements";

import Post from "../components/Post";
import Permit from "../shared/Permit";
import InfinityScroll from "../shared/InfinityScroll";

import { history } from "../redux/configureStore";

const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);

  useEffect(() => {
    if (post_list.length < 2) {
      dispatch(postActions.getPostAxios());
    }
  }, []);

  return (
    <React.Fragment>
      <Grid padding="12px 0px">
        <InfinityScroll>
          {post_list.map((p) => {
            console.log(p);
            return (
              <Grid bg="#ffffff" margin="8px 0px" key={p.postId}>
                <Post {...p} />
              </Grid>
            );
          })}
        </InfinityScroll>
        <Permit>
          <Button
            is_float
            text="+"
            _onClick={() => {
              history.push("/write");
            }}
          ></Button>
        </Permit>
      </Grid>
    </React.Fragment>
  );
};

export default PostList;
