export const login = async (formData) => {
  const response = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    // Throw the error message sent from backend or generic
    throw new Error(data.message || "Login failed");
  }

  if (!data.token) {
    throw new Error("No token received from server");
  }

  localStorage.setItem("token", data.token);
  return data.token;
};

export const register = async (formData) => {
  const response = await fetch("http://localhost:3000/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  if (!data.token) {
    throw new Error("No token received from server");
  }

  localStorage.setItem("token", data.token);
  return data.token;
};
