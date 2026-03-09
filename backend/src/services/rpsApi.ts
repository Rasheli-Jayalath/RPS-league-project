import axios from "axios";

const TOKEN = "KqvLnWW-6lkuBDXfNGey69dW7b3fMyKm";

const api = axios.create({
  baseURL: "https://assignments.reaktor.com",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const getMatches = async () => {
  const response = await api.get("/history");
  return response.data.data;
};