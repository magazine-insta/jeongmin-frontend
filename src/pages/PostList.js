// PostList.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

import { Grid, Button } from "../elements";

import Post from "../components/Post";
import Permit from "../shared/Permit";
import InfinityScroll from "../shared/InfinityScroll";

import { history } from "../redux/configureStore";

const PostList = (props) => {
  const dispatch = useDispatch();
  const { list, is_loading, paging } = useSelector((state) => state.post);
  console.log(list);

  useEffect(() => {
    dispatch(postActions.getPostAxios(paging.page));
    dispatch(imageActions.setPreview(null));
  }, []);

  return (
    <React.Fragment>
      <Grid padding="12px 0px">
        <InfinityScroll
          callNext={() => {
            dispatch(postActions.getPostAxios(paging.page));
          }}
          is_next={paging.next ? true : false}
          loading={is_loading}
        >
          {list.map((p) => {
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
