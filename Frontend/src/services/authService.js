export const login = async (formData) => {
  const response = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(text || "Login failed");
  }

  if (!response.ok) {
    throw new Error((data && data.message) || "Login failed");
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

  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(text || "Registration failed");
  }

  if (!response.ok) {
    throw new Error((data && data.message) || "Registration failed");
  }

  if (!data.token) {
    throw new Error("No token received from server");
  }

  localStorage.setItem("token", data.token);
  return data.token;
};
