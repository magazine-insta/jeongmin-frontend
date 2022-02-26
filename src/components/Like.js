import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Text, Grid } from "../elements";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { actionCreators as likeActions } from "../redux/modules/like";

const Like = (props) => {
  const dispatch = useDispatch();
  // const likes = {
  //   postId: props.postId,
  //   likeCnt: props.likeCnt,
  //   userLiked: props.userLiked,
  //   isMe: props.isMe,
  // };
  const [likeCnt, setLikeCnt] = useState(props.likeCnt);
  const [userLiked, setUserLiked] = useState(props.userLiked);

  const cancelLike = () => {
    // 빨강 -> 회색
    dispatch(likeActions.cancelLikeAxios(props.postId));
    setUserLiked(false);
    setLikeCnt(likeCnt - 1);
  };

  const addLike = () => {
    // 회색 -> 빨강
    dispatch(likeActions.addLikeAxios(props.postId));
    setUserLiked(true);
    setLikeCnt(likeCnt + 1);
  };

  return (
    <>
      <Grid is_flex padding="5px" width="150px">
        <Text>좋아요 {likeCnt}개</Text>
      </Grid>
      <div>
        {userLiked ? (
          <FavoriteIcon style={{ color: "red" }} onClick={cancelLike} />
        ) : (
          <FavoriteBorderIcon onClick={addLike} />
        )}
      </div>
    </>
  );
};

export default Like;
