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
const checkUser = createAction(CHECK_USER, (user) => ({ user }))

// 초기정보
const initialState = {
  user: null,
  is_login: false,
};

// 미들웨어
const signupAxios = (userEmail, password, nickname, pwd_check) => {
  return function (dispatch, getState, { history }) {
    console.log("signupAxios::: ", userEmail, password, nickname);

    // form-data 방식
    // const formData = new FormData();
    // formData.append("userEmail", userEmail);
    // formData.append("password", password);
    // formData.append("nickname", nickname);

    const user = {
      account_email: userEmail,
      account_name: nickname,
      password: password,
      password_check: pwd_check,
    };

    instance
      // .post(
      //   "user/signup",
      //   formData,
      //   {
      //     headers: { "Content-Type": "multipart/form-data" },
      //   },
      //   { withCredentials: true },
      // )
      .post("api/register", user)
      .then((res) => {
        // console.log(res);
        // return res.data.userData;
        window.alert(res.data.msg);
        history.replace("/login");
      })
      // .then((user) => {
      //   dispatch(
      //     setUser({
      //       userId: user.id,
      //       nickname: user.nickname,
      //       userEmail: user.userEmail,
      //     })
      //   );
      //   window.alert(`${user.nickname}님, 회원가입이 완료 되었습니다.`);
      //   history.replace('/login');
      // })
      .catch((err) => console.log("회원가입 실패: ", err.response));
  };
};

const loginAxios = (username, password) => {
  return function (dispatch, getState, { history }) {
    // const formData = new FormData();

    // formData.append("username", username);
    // formData.append("password", password);
    const user = {
      email: username,
      password: password,
    };
    instance
      .post("api/login", user)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        const user_info = {
          account_id: data.data.account_id,
          account_email: data.data.account_email,
          account_name: data.data.account_name,
        }
        console.log(user_info)
        // axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;
        setCookie("token", data.data.token);
        sessionStorage.setItem("user_info", JSON.stringify(user_info))
        dispatch(
          setUser({
            account_id: data.data.account_id,
            account_email: data.data.account_email,
            account_name: data.data.account_name,
          })
        );
        history.push("/");
      })
      // .post(
      //   "user/login",
      //   formData,
      //   {
      //     headers: { "Content-Type": "multipart/form-data" },
      //   }
      //   // { withCredentials: true },
      // )
      // .then((res) => {
      //   console.log(res);
      //   // if (res.status === 200) {
      //   //   sessionStorage.setItem("JSESSIONID", res.data.sessionId);
      //   //   // dispatch(setUser());
      //   //   window.alert(`${res.data.userData.nickname}님 환영합니다!`);
      //   //   history.replace("/");
      //   // }
      // })
      .catch((err) => console.log("로그인 실패: ", err));
  };
};

const loginCheck = () => {
  return function (dispatch, getState, { history }) {
    const user_info = sessionStorage.getItem("user_info")
    console.log(user_info)
    dispatch(checkUser(JSON.parse(user_info)))
    // const { user_id: userId } = jwt(response.data.token);
    // if (token) {
    //   dispatch(
    //     setUser({
    //       is_login: true,
    //     })
    //   );
    // } else {
    //   dispatch(logOut());
    // }
  };
};

const logoutFB = () => {
  return function (dispatch, getState, { history }) {
    instance.get("user/logout").then(() => {
      window.alert("로그아웃 되었습니다.");
      dispatch(logOut());
      history.replace("/");
    });
  };
};

// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        sessionStorage.setItem("user_info", JSON.stringify(action.payload.user));
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        deleteCookie("user_info");
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

// action creator export
const actionCreators = {
  logOut,
  setUser,
  loginCheck,
  signupAxios,
  loginAxios,
  logoutFB,
};

export { actionCreators };
