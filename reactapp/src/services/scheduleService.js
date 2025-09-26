import axios from 'axios';

const BASE_URL = 'http://localhost:8080';
export const addSchedule = (data) => axios.post(`${BASE_URL}/add`, data);
export const getAllSchedules = () => axios.get(`${BASE_URL}/all`);
export const updateSchedule = (id, data) => axios.put(`${BASE_URL}/update/${id}`, data);
export const deleteSchedule = (id) => axios.delete(`${BASE_URL}/delete/${id}`);
export const getScheduleById = (id) => axios.get(`${BASE_URL}/all`).then(res =>
  res.data.find(entry => entry.id === parseInt(id))
);
