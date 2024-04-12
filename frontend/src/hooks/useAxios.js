import axios from "axios";

import {  useNavigate } from "react-router-dom";


const useAxios = () => {
//   const authContext = useContext(AuthContext);
  const axiosInstance = axios.create();
  let storage = window.localStorage;
  if (!storage.authtoken) {
    storage = window.sessionStorage;
  }
  const data = storage.getItem("authtoken");
  const navigate=useNavigate();

  // const data = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
  axiosInstance.interceptors.request.use((request) => {
      request.headers["Authorization"] = `Bearer ${data}`;
    return request;
  });

  axiosInstance.interceptors.response.use(
    function(response){
      return response;
    },
    function(error){
      if(!!error.response.status && error.response.status === 401){
        console.log("unauthorized data found");
        // signout();
        window.localStorage.clear();
        navigate({ pathname: "/" });
      }
       else return Promise.reject(error);
    } 
  );

  return axiosInstance;
};

export default useAxios;
