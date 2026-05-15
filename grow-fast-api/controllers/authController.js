const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const SALT_ROUNDS = 12;
const JWT_EXPIRES_IN = "7d";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const signToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email, role: user.role, plan: user.plan },
    process.env.JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );

const safeUser = (user) => {
  const { password_hash, ...rest } = user;
  return rest;
};

// ─── Register ─────────────────────────────────────────────────────────────────
// POST /api/auth/register
// Body: { name, email, password }

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // --- Validate input
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "name, email and password are required." });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  try {
    // --- Check email already exists
    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [
      email.toLowerCase().trim(),
    ]);

    if (existing.rows.length > 0) {
      return res
        .status(409)
        .json({ error: "An account with this email already exists." });
    }

    // --- Hash password
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    // --- Insert user
    const { rows } = await pool.query(
      `INSERT INTO users (name, email, password_hash, role, plan)
       VALUES ($1, $2, $3, 'user', 'starter')
       RETURNING *`,
      [name.trim(), email.toLowerCase().trim(), password_hash],
    );

    const user = rows[0];

    // --- Create empty brand kit for the new user
    await pool.query(
      `INSERT INTO brand_kits (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING`,
      [user.id],
    );

    // --- Sign token & respond
    const token = signToken(user);

    return res.status(201).json({
      message: "Account created successfully.",
      token,
      user: safeUser(user),
    });
  } catch (err) {
    console.error("[register] error:", err.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// ─── Login ────────────────────────────────────────────────────────────────────
// POST /api/auth/login
// Body: { email, password }

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    // --- Find user
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email.toLowerCase().trim(),
    ]);

    const user = rows[0];

    // --- Generic message to avoid user enumeration
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // --- Check account is active
    if (!user.is_active) {
      return res
        .status(403)
        .json({
          error: "Your account has been suspended. Please contact support.",
        });
    }

    // --- Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // --- Sign token & respond
    const token = signToken(user);

    return res.status(200).json({
      message: "Login successful.",
      token,
      user: safeUser(user),
    });
  } catch (err) {
    console.error("[login] error:", err.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// ─── Get current user (me) ────────────────────────────────────────────────────
// GET /api/auth/me
// Requires: Authorization: Bearer <token>

const me = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT u.*, bk.brand_name, bk.primary_color, bk.logo_url, bk.tone
       FROM users u
       LEFT JOIN brand_kits bk ON bk.user_id = u.id
       WHERE u.id = $1`,
      [req.user.id],
    );

    const user = rows[0];
    if (!user) return res.status(404).json({ error: "User not found." });

    return res.status(200).json({ user: safeUser(user) });
  } catch (err) {
    console.error("[me] error:", err.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { register, login, me };
