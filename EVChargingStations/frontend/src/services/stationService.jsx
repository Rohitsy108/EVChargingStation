import axios from "axios";

const API = "http://localhost:5000/api";

export const getAllChargers = async (filters) => {
  const params = new URLSearchParams(filters).toString();
  const res = await axios.get(`${API}/chargers?${params}`);
  return res.data;
};

export const deleteCharger = async (id) => {
  await axios.delete(`${API}/chargers/${id}`);
};

export const addCharger = async (data) => {
  const res = await axios.post(`${API}/chargers`, data);
  return res.data;
};

export const editCharger = async (id, data) => {
  const res = await axios.put(`${API}/chargers/${id}`, data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await axios.post(`${API}/register`, data);
  return res.data;
};
