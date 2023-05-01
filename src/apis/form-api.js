import axios from "../config/axios";
export const createFillApi = input => axios.post("/fill", input);
export const getDetailApi = () => axios.get("/fill");
