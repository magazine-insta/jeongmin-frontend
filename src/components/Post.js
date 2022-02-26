import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { Grid, Image, Text } from "../elements";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Moment from "react-moment";
import "moment/locale/ko";

import Like from "./Like";
import { history } from "../redux/configureStore";

const Post = (props) => {
  const dispatch = useDispatch();

  const layout = props.layoutType;

  const likes = {
    postId: props.postId,
    likeCnt: props.likeCnt,
    userLiked: props.userLiked,
    isMe: props.isMe,
  };

  const displayCreatedAt = (createdAt) => {
    let startTime = new Date(createdAt);
    let nowTime = Date.now();
    if (parseInt(startTime - nowTime) > -60000) {
      return <Moment format="방금 전">{startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) < -86400000) {
      return <Moment format="MMM D일">{startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) > -86400000) {
      return <Moment fromNow>{startTime}</Moment>;
    }
  };

  return (
    <React.Fragment>
      <PostBox>
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <AccountCircleIcon style={{ marginRight: "4px" }} />
            <Text bold>{props.nickname}</Text>
          </Grid>
          <Grid width="auto">
            <Text>{displayCreatedAt(props.createdAt)}</Text>
          </Grid>
        </Grid>
        <Grid
          _onClick={() => {
            console.log(props.postId);
            history.replace(`/post/${props.postId}`);
          }}
        >
          {layout === "DEFAULT" && (
            <>
              <Grid padding="16px">
                <Text>{props.contents}</Text>
              </Grid>
              <Grid>
                <Image shape="rectangle" src={props.imgUrl} />
              </Grid>
            </>
          )}
          {layout === "RIGHT" && (
            <Grid is_flex>
              <Grid padding="16px">
                <Text>{props.contents}</Text>
              </Grid>
              <Grid>
                <Image shape="rectangle" src={props.imageUrl} />
              </Grid>
            </Grid>
          )}
          {layout === "LEFT" && (
            <Grid is_flex>
              <Grid>
                <Image shape="rectangle" src={props.imageUrl} />
              </Grid>
              <Grid padding="16px">
                <Text>{props.contents}</Text>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid is_flex padding="5px 16px">
          <Like {...likes}></Like>
        </Grid>
      </PostBox>
    </React.Fragment>
  );
};

Post.defaultProps = {
  postId: 0,
  nickname: "nickname",
  createdAt: "",
  contents: "doremi",
  imageUrl: "doremi",
  likeCnt: 0,
  userLiked: false,
  layoutType: "DEFAULT",
  isMe: false,
};

const PostBox = styled.div`
  border: 1px solid #e7c1ff;
  border-radius: 5px;
  box-shadow: 5px 5px 5px #e7c1ff;
`;

export default Post;
