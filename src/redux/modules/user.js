// 리덕스
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// 쿠키생성
import { setCookie, deleteCookie } from "../../shared/Cookie";
// API 연결
import { instance } from "../../services/axios";

// 액션 선언
const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";
const CHECK_USER = "CHECK_USER";

// 액션 생성
const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const checkUser = createAction(CHECK_USER, (user) => ({ user }));

// 초기정보
const initialState = {
  user: null,
  is_login: false,
};

// 미들웨어
const signupAxios = (username, password, nickname) => {
  return function (dispatch, getState, { history }) {
    console.log("signupAxios::: ", username, password, nickname);

    const user = {
      username: username,
      nickname: nickname,
      password: password,
    };

    instance
      .post("api/signup", user)
      .then((res) => {
        window.alert("회원가입을 축하드립니다.");
        history.replace("/login");
      })
      .catch((err) => console.log("회원가입 실패: ", err.response));
  };
};

const loginAxios = (username, password) => {
  return function (dispatch, getState, { history }) {
    const user = {
      username: username,
      password: password,
    };
    instance
      .post("api/login", user)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        console.log(data);
        const user_info = {
          userId: data.userId,
          userEmail: data.userEmail,
          nickname: data.nickname,
        };
        setCookie("token", data.token);
        dispatch(setUser(user_info));
        history.replace("/");
      })
      .catch((err) => console.log("로그인 실패: ", err));
  };
};

const loginCheck = (token) => {
  return function (dispatch, getState, { history }) {
    if (token) {
      instance
        .get("api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          const user_info = {
            userId: data.userId,
            userEmail: data.username,
            nickname: data.nickname,
          };
          dispatch(checkUser(user_info));
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  };
};

const logout = (token) => {
  return function (dispatch, getState, { history }) {
    deleteCookie("token");
    window.alert("다음에 다시 만나요!");
    dispatch(logOut());
    history.replace("/");
  };
};

// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.is_login = false;
      }),
    [CHECK_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
  },
  initialState
);

// 액션 크리에이터 함수 모아서 내보내기
const actionCreators = {
  logOut,
  setUser,
  signupAxios,
  loginAxios,
  loginCheck,
  logout,
};

export { actionCreators };
