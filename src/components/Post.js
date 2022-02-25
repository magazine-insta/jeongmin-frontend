import React, { useEffect, useState } from "react";
import { Grid, Image, Text } from "../elements";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import moment from "moment";
import Like from "./Like";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as likeActions } from "../redux/modules/like";
import styled from "styled-components";

const Post = (props) => {
  // const dispatch = useDispatch();
  // increase, decrease dispatch reducer
  // useEffect(() => {
  //   dispatch(likeActions.getLikeFB(props.id));
  // }, []);

  const layout = props.layoutType;

  const today = moment().format();
  const createdAt = moment(props.time[3]).hours();
  const timeDiff = Math.abs(moment(today).hour() - createdAt);

  return (
    <React.Fragment>
      <PostBox>
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <AccountCircleIcon style={{ marginRight: "4px" }} />
            <Text bold>{props.nickname}</Text>
          </Grid>
          <Grid width="auto">
            <Text>{timeDiff}시간 전</Text>
          </Grid>
        </Grid>
        <Grid
          _onClick={() => {
            history.push(`/post/${props.board_id}`);
          }}
        >
          {layout === "DEFAULT" && (
            <>
              <Grid padding="16px">
                <Text>{props.contents}</Text>
              </Grid>
              <Grid>
                <Image shape="rectangle" src={props.img_url} />
              </Grid>
            </>
          )}
          {layout === "RIGHT" && (
            <Grid is_flex>
              <Grid padding="16px">
                <Text>{props.contents}</Text>
              </Grid>
              <Grid>
                <Image shape="rectangle" src={props.img_url} />
              </Grid>
            </Grid>
          )}
          {layout === "LEFT" && (
            <Grid is_flex>
              <Grid>
                <Image shape="rectangle" src={props.img_url} />
              </Grid>
              <Grid padding="16px">
                <Text>{props.contents}</Text>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid is_flex padding="5px 16px">
          <Like post_id={props.board_id}></Like>
        </Grid>
      </PostBox>
    </React.Fragment>
  );
};

Post.defaultProps = {
  account_id: 0,
  account_name: "test",
  board_id: 0,
  board_status: "DEFAULT",
  content: "귀여운 고양이1",
  img_url: "https://t1.daumcdn.net/cfile/tistory/216C553953FC27C335",
  like: 0,
  time: [],
};

// Post.defaultProps = {
//   postId: 0,
//   nickname: 'nickname',
//   createdAt: '',
//   contents: 'doremi',
//   imageUrl: 'doremi',
//   likeCnt: 0,
//   userLiked: false,
//   layoutType: 'LEFT',
//   is_me: false,
// };

const PostBox = styled.div`
  border: 1px solid #e7c1ff;
  border-radius: 5px;
  box-shadow: 5px 5px 5px #e7c1ff;
`;

export default Post;
