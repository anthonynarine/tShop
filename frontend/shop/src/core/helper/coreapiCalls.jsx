import { API } from "../../backend";

// API is http://localhost:8000/api/

export const getProducts = async () => {
  try {
    const response = await fetch(`${API}product`,);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
