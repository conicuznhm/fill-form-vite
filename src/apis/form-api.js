import axios from "../config/axios";
export const createFillApi = input => axios.post("/submissions", input);
export const getDetailApi = id => axios.get("/submissions/" + id);
export const getAllDetailsApi = () => axios.get("/submissions");