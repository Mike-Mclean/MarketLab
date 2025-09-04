export async function loginUser({ email, password }) {
  return await sendAuthRequest("/login", { email, password });
}

export async function registerUser({ email, password, username }) {
  return await sendAuthRequest("/register", { email, password, username });
}

async function sendAuthRequest(endpoint, payload) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) return { error: data.message || "Something went wrong" };

    return { success: true, data };
  } catch (err) {
    return { error: "Network error" };
  }
}