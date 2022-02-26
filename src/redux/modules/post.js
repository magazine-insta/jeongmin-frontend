// 리덕스
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// 이미지 저장
import { storage } from "../../shared/firebase";
import { actionCreators as imageActions } from "./image";
// 시간포맷
import moment from "moment";
// API연결
import { instance } from "../../services/axios";
// JWT 토큰
import { getCookie } from "../../shared/Cookie";

// 액션 정의
const GET_POST = "GET_POST";
const GET_ONE_POST = "GET_ONE_POST";
const ADD_POST = "ADD_POST";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";
const LOADING = "LOADING";

// action creators
const getPost = createAction(GET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const getOnePost = createAction(GET_ONE_POST, (post) => ({ post }));
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
        dispatch(getPost(res.data, false));
      })
      .catch((err) => console.log("getPostAxios::: ", err.message));
  };
};

const getOnePostFB = (postId) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`api/post/${postId}`)
      .then((res) => {
        dispatch(getOnePost(res.data))
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const addPostFB = (contents = "", layout = "") => {
  console.log("addpost::: ", contents, layout);
  return function (dispatch, getState, { history }) {
    const token = getCookie("token");
    const _user = getState().user.user;

    const user_info = {
      nickname: _user.nickname,
    };

    const _post = {
      ...initialPost,
      contents: contents,
      createdAt: moment().format(),
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
          return url;
        })
        .then((url) => {
          const postData = { ..._post, imageUrl: url };
          instance
            .post(
              "api/post",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
              postData
            )
            .then((doc) => {
              console.log(doc);
            });
          // instance
          //   .post()
          //   .then((doc) => {
          //     let post = { user_info, ..._post, id: doc.id, imageUrl: url };
          //     dispatch(addPost(post));
          //     history.replace("/");

          //     dispatch(imageActions.setPreview(null));
          //   })
          //   .catch((err) => {
          //     window.alert("앗! 포스트 작성에 문제가 있어요!");
          //     console.log("post 작성에 실패했어요!", err);
          //   });
        })
        .catch((err) => {
          window.alert("앗! 이미지 업로드에 문제가 있어요!");
          console.log("앗! 이미지 업로드에 문제가 있어요!", err);
        });
    });
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
        .catch((err) => console.log("updatePost: ", err.code, err.message));
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

export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        draft.is_loading = false;
      }),
    [GET_ONE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.post);
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
  getOnePost,
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
