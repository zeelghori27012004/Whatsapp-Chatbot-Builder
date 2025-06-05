import axios from "axios";

const API_BASE_URL = "http://localhost:3000/projects";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`, getAuthHeaders());
    return response.data.projects;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch projects");
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/create`,
      projectData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to create project");
  }
};

export const updateProjectUsers = async (projectId, users) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/add-user`,
      { projectId, users },
      getAuthHeaders()
    );
    return response.data.project;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to update project");
  }
};

export const getProjectById = async (projectId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/get-project/${projectId}`,
      getAuthHeaders()
    );
    return response.data.project;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to get project");
  }
};

export const deleteProject = async (projectId) => {
  const token = localStorage.getItem("token"); // if you use token auth
  const res = await fetch(
    `http://localhost:3000/projects/delete/${projectId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // if your backend requires auth
      },
    }
  );

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Failed to delete project");
  }
  return await res.json();
};

export const updateProjectFlow = async (projectId, fileTree) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/update-flow/${projectId}`,
      { fileTree },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update project flow"
    );
  }
};
