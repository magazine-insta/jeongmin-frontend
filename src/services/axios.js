import axios from "axios";
import { getCookie } from "../shared/Cookie";

// url 주소 설정
const instance = axios.create({
  baseURL: process.env.REACT_APP_MAGAZINE_API_BASE_URL,
});

// JWT 토큰
const token = getCookie("token");

export { instance, token };
