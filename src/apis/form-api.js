import axios from "../config/axios";
export const createFillApi = input => axios.post("/fill", input);
export const getDetailApi = id => axios.get("/fill/" + id);
export const getAllDetailsApi = () => axios.get("/fill");
