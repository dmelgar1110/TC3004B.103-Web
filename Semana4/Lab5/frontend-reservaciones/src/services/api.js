// src/services/api.js
import axios from "axios";
const API_URL = "http://localhost:5000/api/reservaciones";
export const getReservations = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las reservaciones:", error);
    throw error;
  }
};
export const getReservation = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la reservación:", error);
    throw error;
  }
};
export const createReservation = async (reservation) => {
  try {
    const response = await axios.post(API_URL, reservation);
    return response.data;
  } catch (error) {
    console.error("Error al crear la reservación:", error);
    throw error;
  }
};
export const updateReservation = async (id, reservation) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, reservation);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la reservación:", error);
    throw error;
  }
};
export const deleteReservation = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la reservación:", error);
    throw error;
  }
};
