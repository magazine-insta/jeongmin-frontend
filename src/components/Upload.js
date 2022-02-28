import React, { useRef, useState } from "react";
import { Input, Grid, Button } from "../elements";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";

const Upload = (props) => {
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.image.uploading);
  const fileInput = useRef();

  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  return (
    <>
      <Grid is_flex>
        <Button width="100px">
          <label htmlFor="file">이미지 올리기</label>
        </Button>
        <input
          id="file"
          ref={fileInput}
          type="file"
          style={{ display: "none" }}
          disabled={uploading}
          onChange={selectFile}
        />
      </Grid>
    </>
  );
};

export default Upload;
