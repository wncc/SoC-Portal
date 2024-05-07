// src/utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL:"https://itc.gymkhana.iitb.ac.in/socbackend"
});

export default api;
