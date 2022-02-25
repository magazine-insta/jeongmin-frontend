import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { storage } from "../../shared/firebase";

// 액션 정의
const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";

// 액션 생성 함수 정의
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (imageUrl) => ({ imageUrl }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

// 업로드 이미지 (파이어 스토어)
function uploadImageFB(image) {
  return function (dispatch, getState, { history }) {
    dispatch(uploading(true));

    const _upload = storage.ref(`images/${image.name}`).put(image);

    // 업로드
    _upload
      .then((snapshot) => {
        console.log(snapshot);
        // 업로드한 파일의 url 가져오는 부분
        snapshot.ref.getDownloadURL().then((url) => {
          console.log(url);
          dispatch(uploadImage(url));
        });
      })
      .catch((err) => {
        dispatch(uploading(false));
        console.log("업로드 이미지", err)
      });
  };
}

// initial state
const initialState = {
  imageUrl: "",
  uploading: false,
  preview: null,
};

// reducer
export default handleActions(
  {
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.imageUrl = action.payload.imageUrl;
        draft.uploading = false;
      }),

    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState
);

const actionCreators = {
  uploadImage,
  uploadImageFB,
  setPreview,
};

export { actionCreators };
