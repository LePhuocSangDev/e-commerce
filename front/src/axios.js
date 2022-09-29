import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

let TOKEN;

if (!localStorage.getItem("persist:root")) {
  TOKEN = "";
} else {
  const { userInfo } = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).user
  );
  userInfo ? (TOKEN = userInfo.accessToken) : (TOKEN = "");
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const addressRequest = axios.create({
  baseURL: "https://online-gateway.ghn.vn/shiip/public-api/master-data",
  // headers: { token: process.env.REACT_APP_BASE_URL },
  headers: { token: "d3cc4fa0-35c9-11ed-8008-c673db1cbf27" },
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `sang ${TOKEN}` },
});