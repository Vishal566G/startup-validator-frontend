import axios from "axios";

const API = axios.create({
  baseURL: process.env.VITE_API_URL,
});

export const submitIdea = (data) => API.post("/ideas", data);
export const getIdeas = () => API.get("/ideas");
export const getIdeaById = (id) => API.get(`/ideas/${id}`);
export const deleteIdea = (id) => API.delete(`/ideas/${id}`);
