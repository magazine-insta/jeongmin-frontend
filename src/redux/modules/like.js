import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { instance, token } from "../../services/axios";

// const SET_LIKE = 'SET_LIKE';
const ADD_LIKE = "ADD_LIKE";
const CANCEL_LIKE = "CANCEL_LIKE";

// const setLike = createAction(SET_LIKE, (postId) => ({ postId }));

const addLike = createAction(ADD_LIKE, (postId) => ({ postId }));

const cancelLike = createAction(CANCEL_LIKE, (postId) => ({ postId }));

const initialState = {
  newLikeCnt: 0,
  message: "",
};

// const getLikeAxios = (postId) => {
//   return function (dispatch, getState, { history }) {
//     if (!postId) {
//       return;
//     }

//     instance
//       .get(`api/post/${postId}/like`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//       { withCredentials: true }
//       )
//       .then((docs) => {
//         console.log(docs);
//         dispatch(setLike(postId));
//       })
//       .catch((err) => {
//         console.log('like::: ', err.response);
//       });
//   };
// };

const addLikeAxios = (postId) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(
        `api/post/${postId}/like`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        { withCredentials: true }
      )
      .then((docs) => {
        // console.log(docs);
        dispatch(addLike(postId));
      })
      .catch((err) => {
        console.log("like::: ", err.response);
      });
  };
};

const cancelLikeAxios = (postId) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(
        `api/post/${postId}/like`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        { withCredentials: true }
      )
      .then((docs) => {
        // console.log(docs);
        dispatch(cancelLike(postId));
      })
      .catch((err) => {
        console.log("like::: ", err.response);
      });
  };
};

export default handleActions(
  {
    // [SET_LIKE]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.list[action.payload.postId] = action.payload.user_list;
    //   }),
    [ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id].push(action.payload.newLikeCnt);
      }),
    [CANCEL_LIKE]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  addLikeAxios,
  cancelLikeAxios,
};

export { actionCreators };
