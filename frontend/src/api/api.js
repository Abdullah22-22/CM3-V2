import axios from "axios";


const baseUrl = "http://localhost:4000";


export async function getcCars(params) {
  const res = await axios.get(`${baseUrl}/api/vehicleRentals`, { params });
  return res.data;
}

export async function getcCarById(id) {
  const res = await axios.get(`${baseUrl}/api/vehicleRentals/${id}`);
  return res.data;
}

export async function createCar(payload) {
  const res = await axios.post(`${baseUrl}/api/vehicleRentals`, payload);
  return res.data;
}

export async function updateCar(id, payload) {
  const res = await axios.put(`${baseUrl}/api/vehicleRentals/${id}`, payload);
  return res.data;
}

export async function deleteCar(id) {
  const res = await axios.delete(`${baseUrl}/api/vehicleRentals/${id}`);
  return res.data;
}

export async function registerUser(payload) {
  const res = await axios.post(`${baseUrl}/api/register`, payload);
  return res.data;
}

export async function loginUser(payload) {
  const res = await axios.post(`${baseUrl}/api/login`, payload);
  return res.data;
}

