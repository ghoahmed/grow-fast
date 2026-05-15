/**
 * grow API Service
 *
 * Base URL: http://localhost:3000/api  (or VITE_API_URL env var)
 *
 * All authenticated requests send:  Authorization: Bearer <token>
 * Your backend error shape:         { error: "..." }
 * Your backend success shape:       { message, token?, user?, ... }
 */

const BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

function getToken() {
  return localStorage.getItem("grow_token");
}

async function request(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  // 401 → session gone, force reload so AuthContext clears state
  if (res.status === 401) {
    localStorage.removeItem("grow_token");
    localStorage.removeItem("grow_user");
    window.location.reload();
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // Your API always returns { error: "..." } for failures
    throw new Error(data.error || `Request failed (${res.status})`);
  }

  return data;
}

// ── Auth ─────────────────────────────────────────────────────────────────
// POST /api/login    → { message, token, user }
// POST /api/register → { message, token, user }
export const auth = {
  login: (email, password) =>
    request("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  register: (name, email, password, role) =>
    request("/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, role }),
    }),
};
export default { auth };
