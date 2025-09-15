
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://mini-crm-88ft.onrender.com/api",
  withCredentials: true, 
});

export default apiClient;
