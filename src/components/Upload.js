import React, { useRef, useState } from "react";
import { Input, Grid, Button } from "../elements";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";

const Upload = (props) => {
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.image.uploading);
  const fileInput = useRef();
  const [fileName, setFileName] = useState("");

  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
    };
    setFileName(e.target.value.split("\\")[2]);
  };

  return (
    <>
      <Grid is_flex>
        <Input
          width="100%"
          type="text"
          placeholder="사진을 선택해주세요!"
          value={fileName}
          margin="0"
          disabled
        />
        <Button width="50px">
          <label htmlFor="file">파일 찾기</label>
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
