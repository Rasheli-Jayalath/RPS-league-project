import axios from "axios";

const TOKEN = "KqvLnWW-6lkuBDXfNGey69dW7b3fMyKm";

const api = axios.create({
  baseURL: "https://assignments.reaktor.com",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export const getMatches = async () => {
  let allMatches: any[] = [];
  let nextPath = "/history";

  try {
    while (nextPath) {
      const response = await api.get(nextPath);

      const pageData = response.data.data;
      allMatches = allMatches.concat(pageData);

      nextPath = response.data.next ?? null;
    }

    return allMatches;

  } catch (error) {
    console.error("Error fetching history:", error);
    throw error;
  }
};