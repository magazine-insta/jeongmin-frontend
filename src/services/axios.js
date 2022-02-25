import axios from "axios";

// url 주소 설정
const instance = axios.create({
  baseURL: process.env.REACT_APP_MAGAZINE_API_BASE_URL,
});

export { instance };
