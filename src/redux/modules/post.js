// 리덕스
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// 이미지 저장
import { storage } from "../../shared/firebase";
import { actionCreators as imageActions } from "./image";
// 시간포맷
import moment from "moment";
// API연결
import axios from"axios";
import { instance } from "../../services/axios";

// 액션 정의
const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";
const LOADING = "LOADING";

// action creators
const getPost = createAction(GET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const updatePost = createAction(UPDATE_POST, (postId, post) => ({
  postId,
  post,
}));
const deletePost = createAction(DELETE_POST, (postId) => ({ postId }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

// 초기화 정보
const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
};

const initialPost = {
  postId: 0,
  nickname: "amin",
  createdAt: moment().format(),
  contents: "testContents_admin",
  imageUrl: "testUrl_admin",
  likeCnt: 0,
  userLiked: false,
  layoutType: "RIGHT",
  isMe: false,
};
// const initialPost = {
//   imageUrl: "https://firebasestorage.googleapis.com/v0/b/cloneinsta-9ee36.appspot.com/o/images%2FNliT0arDIZWXN4ZYizriHqIFfIo1_1645515492237?alt=media&token=d91c1923-7a44-406c-bb8c-3aecaa55c2dd",
//   contents: "테스트",
//   createdAt: moment().format(),
//   layoutType: "DEFAULT",
// };

// 미들웨어
const getPostAxios = (start = null, size = 3) => {
  return function (dispatch, getState, { history }) {
    let _paging = getState().post.paging;
    if (_paging.start && !_paging.next) {
      return;
    }
    dispatch(loading(true));
    instance
      .get("api/post")
      .then((res) => {
        console.log(res);
        // dispatch(getPost(res.data, false));
        // return res.data;
      })
      // .then((data) => {
      //   dispatch(getPost(data.data, false));
      // })
      .catch((err) => console.log("getPostAxios::: ", err.message));
  };
};

const deletePostFB = (postId = null) => {
  return function (dispatch, getState, { history }) {
    // if (!postId) {
    //   console.log('게시물 정보가 없어요!');
    //   return;
    // }

    instance
      .delete(`api/post/${postId}/like`)
      .then(() => {
        dispatch(deletePost(postId));
      })
      .catch((err) => console.log("deletePost::: ", err.message));
  };
};

const updatePostFB = (postId = null, post = {}) => {
  return function (dispatch, getState, { history }) {
    // if (!postId) {
    //   console.log('게시물 정보가 없어요!');
    //   return;
    // }

    const _image = getState().image.preview;

    const _postIdx = getState().post.list.findIndex((p) => p.id === postId);
    const _post = getState().post.list[_postIdx];

    if (_image === _post.imageUrl) {
      instance
        .put(`api/post/${postId}`)
        .then(() => {
          dispatch(updatePost(postId, { ...post }));
        })
        .catch((err) => console.log("회원가입 실패: ", err.code, err.message));
      return;
    } else {
      const _upload = storage
        .ref(`images/${postId}_${new Date().getTime()}`)
        .putString(_image, "data_url");

      _upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log(url);

            return url;
          })
          .then((url) => {
            instance
              .put(`api/post/${postId}`)
              .then(() => {
                dispatch(updatePost(postId, { ...post, imageUrl: url }));
              })
              .catch((err) => console.log(" ", err.code, err.message));
          })
          .catch((err) => {
            console.log("앗! 이미지 업로드에 문제가 있어요!", err.message);
          });
      });
    }
  };
};

const addPostFB = (contents = "", layout = "") => {
  console.log("addpost::: ", contents, layout);
  return function (dispatch, getState, { history }) {
    const _user = getState().user.user;

    const user_info = {
      nickname: _user.nickname,
    };

    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format(),
      layoutType: layout,
    };

    const _image = getState().image.preview;

    console.log(_image);
    console.log(typeof _image);

    const _upload = storage
      .ref(`images/${user_info.nickname}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          console.log(url);

          return url;
        })
        .then((url) => {
          instance
            .post({ ..._post, imageUrl: url })
            .then((doc) => {
              let post = { user_info, ..._post, id: doc.id, imageUrl: url };
              dispatch(addPost(post));
              history.replace("/");

              dispatch(imageActions.setPreview(null));
            })
            .catch((err) => {
              window.alert("앗! 포스트 작성에 문제가 있어요!");
              console.log("post 작성에 실패했어요!", err);
            });
        })
        .catch((err) => {
          window.alert("앗! 이미지 업로드에 문제가 있어요!");
          console.log("앗! 이미지 업로드에 문제가 있어요!", err);
        });
    });
  };
};

const getOnePostFB = (id) => {
  //   return function (dispatch, getState, { history }) {
  //     const postDB = firestore.collection('post');
  //     postDB
  //       .doc(id)
  //       .get()
  //       .then((doc) => {
  //         console.log(doc);
  //         console.log(doc.data());
  //         let _post = doc.data();
  //         let post = Object.keys(_post).reduce(
  //           (acc, cur) => {
  //             if (cur.indexOf('user_') !== -1) {
  //               return {
  //                 ...acc,
  //                 user_info: { ...acc.user_info, [cur]: _post[cur] },
  //               };
  //             }
  //             return { ...acc, [cur]: _post[cur] };
  //           },
  //           { id: doc.id, user_info: {} },
  //         );
  //         dispatch(getPost([post]));
  //       });
  //   };
};

export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        draft.is_loading = false;
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),

    [UPDATE_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.postId);

        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),

    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  getPost,
  addPost,
  updatePost,
  deletePost,
  getPostAxios,
  addPostFB,
  updatePostFB,
  getOnePostFB,
  deletePostFB,
};

export { actionCreators };