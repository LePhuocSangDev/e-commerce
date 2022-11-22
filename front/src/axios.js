import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_ADDRESS;

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
  headers: { token: process.env.REACT_APP_GHT_TOKEN },
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `sang ${TOKEN}` },
});
