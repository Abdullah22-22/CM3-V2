import axios from "axios";

const baseUrl = "/api";

function getAuthConfig() {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function getcCars(params) {
  const res = await axios.get(`${baseUrl}/vehicleRentals`, { params });
  return res.data;
}

export async function getcCarById(id) {
  const res = await axios.get(`${baseUrl}/vehicleRentals/${id}`);
  return res.data;
}

export async function createCar(payload) {
  const res = await axios.post(
    `${baseUrl}/vehicleRentals`,
    payload,
    getAuthConfig()
  );
  return res.data;
}

export async function updateCar(id, payload) {
  const res = await axios.put(
    `${baseUrl}/vehicleRentals/${id}`,
    payload,
    getAuthConfig()
  );
  return res.data;
}

export async function deleteCar(id) {
  const res = await axios.delete(
    `${baseUrl}/vehicleRentals/${id}`,
    getAuthConfig()
  );
  return res.data;
}

export async function registerUser(payload) {
  const res = await axios.post(`${baseUrl}/register`, payload);
  return res.data;
}

export async function loginUser(payload) {
  const res = await axios.post(`${baseUrl}/login`, payload);
  return res.data;
}