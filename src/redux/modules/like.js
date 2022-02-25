import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

import { instance } from '../../services/axios';

const SET_LIKE = 'SET_LIKE';
const ADD_LIKE = 'ADD_LIKE';
const CANCEL_LIKE = 'CANCEL_LIKE';

const setLike = createAction(SET_LIKE, (postId) => ({ postId }));

const addLike = createAction(ADD_LIKE, (postId) => ({ postId }));

const cancelLike = createAction(CANCEL_LIKE, (postId) => ({ postId }));

const initialState = {
  list: {},
};

const getLikeAxios = (postId) => {
  return function (dispatch, getState, { history }) {
    // if (!postId) {
    //   return;
    // }

    instance
      .get(`api/post/${postId}/like`)
      .then((docs) => {
        console.log(docs);
        dispatch(setLike(postId));
      })
      .catch((err) => {
        console.log('like::: ', err.message);
      });
  };
};

const addLikeAxios = (postId) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`api/post/${postId}/like`)
      .then((docs) => {
        console.log(docs);
        dispatch(addLike(postId));
      })
      .catch((err) => {
        console.log('like::: ', err.message);
      });
  };
};

const cancelLikeAxios = (postId) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`api/post/${postId}/like`)
      .then((docs) => {
        console.log(docs);
        dispatch(cancelLike(postId));
      })
      .catch((err) => {
        console.log('like::: ', err.message);
      });
  };
};

export default handleActions(
  {
    [SET_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postId] = action.payload.user_list;
      }),
    [ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postId].push(action.payload.userEmail);
      }),
    [CANCEL_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postId] = draft.list[
          action.payload.postId
        ].filter((l) => l !== action.payload.userEmail);
      }),
  },
  initialState,
);

const actionCreators = {
  getLikeAxios,
  addLikeAxios,
  cancelLikeAxios,
};

export { actionCreators };
