import axios from "axios";

// const baseUrl = "http://localhost:5000/";
const baseUrl = "https://pdfpayslip-backend.herokuapp.com/";
const getAuthHeader = () => {
  const token = localStorage.getItem("Token") || null;
  console.log("authheader", token);
  return { Authorization: `Bearer ${token}` };
};
const getRequest = (path) => {
  const result = axios.get(`${baseUrl}${path}`, { headers: getAuthHeader() });
  return result.then(({ data }) => data);
};
const postRequest = (path, body) => {
  const result = axios.post(`${baseUrl}${path}`, body, {
    headers: getAuthHeader(),
  });
  return result.then(({ data }) => data);
};
const putRequest = (path, body) => {
  const result = axios.put(`${baseUrl}${path}`, body, {
    headers: getAuthHeader(),
  });
  return result.then(({ data }) => data);
};
const deleteRequest = (path) => {
  const result = axios.delete(`${baseUrl}${path}`, {
    headers: getAuthHeader(),
  });
  return result.then(({ data }) => data);
};

const service = { getRequest, postRequest, putRequest, deleteRequest };

export default service;
