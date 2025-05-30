import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/bots";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getBots = async () => {
  try {
    const response = await axios.get(API_BASE_URL, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch bots");
  }
};

export const createBot = async (botData) => {
  try {
    const response = await axios.post(API_BASE_URL, botData, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create bot");
  }
};

export const updateBot = async (botId, botData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${botId}`,
      botData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update bot");
  }
};

export const deleteBot = async (botId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/${botId}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete bot");
  }
};
