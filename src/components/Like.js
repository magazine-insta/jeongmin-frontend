import React, { Component, useEffect, useState } from "react";
import { Text, Grid } from "../elements";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

class Like extends Component {
  state = {
    isLike: false,
    notice: "0",
  };

  updateHeart = () => {
    this.state.isLike
      ? this.setState({
          isLike: false,
          notice: "0",
        })
      : this.setState({
          isLike: true,
          notice: "1",
        });
  };

  render() {
    return (
      <>
        <Grid is_flex padding="5px" width="150px">
          <Text>좋아요 {this.state.notice}개</Text>
        </Grid>
        <div>
          {this.state.isLike ? (
            <FavoriteIcon style={{ color: "red" }} onClick={this.updateHeart} />
          ) : (
            <FavoriteBorderIcon onClick={this.updateHeart} />
          )}
        </div>
      </>
    );
  }
}

export default Like;
