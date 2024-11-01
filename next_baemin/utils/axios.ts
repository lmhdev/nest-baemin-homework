import axios, { ResponseType } from "axios";
import { get } from "lodash";

export const nestRequest = (
  responseType: ResponseType = "json",
  timeout: number = 120000
) => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_NEST_API,
    responseType: responseType,
    timeout: timeout,
  });
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      throw get(error, "response.data", error);
    }
  );
  return axiosInstance;
};
