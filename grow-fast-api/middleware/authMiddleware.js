const jwt = require("jsonwebtoken");
const pool = require("../config/db");

// ─── protect ──────────────────────────────────────────────────────────────────
// Verifies the JWT and attaches req.user.
// Use on any route that requires a logged-in user.

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided. Please log in." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // --- Re-fetch user from DB to catch deactivated accounts or role changes
    const { rows } = await pool.query(
      "SELECT id, name, email, role, plan, is_active FROM users WHERE id = $1",
      [decoded.id],
    );

    const user = rows[0];

    if (!user) {
      return res
        .status(401)
        .json({ error: "Token is no longer valid. User not found." });
    }

    if (!user.is_active) {
      return res
        .status(403)
        .json({ error: "Your account has been suspended." });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Session expired. Please log in again." });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token." });
    }
    console.error("[protect] error:", err.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// ─── requireAdmin ─────────────────────────────────────────────────────────────
// Must be used AFTER protect.
// Blocks access if the user is not an admin.

const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated." });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required." });
  }

  next();
};

// ─── requirePlan ──────────────────────────────────────────────────────────────
// Factory: requirePlan("pro") or requirePlan(["pro", "agency"])
// Must be used AFTER protect.

const requirePlan = (allowedPlans) => (req, res, next) => {
  const plans = Array.isArray(allowedPlans) ? allowedPlans : [allowedPlans];

  if (!plans.includes(req.user.plan)) {
    return res.status(403).json({
      error: `This feature requires a ${plans.join(" or ")} plan.`,
      upgrade: true,
    });
  }

  next();
};

// ─── optionalAuth ─────────────────────────────────────────────────────────────
// Attaches req.user if a valid token is present, but never blocks the request.
// Useful for public routes that behave differently when authenticated.

const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.user = null;
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { rows } = await pool.query(
      "SELECT id, name, email, role, plan, is_active FROM users WHERE id = $1",
      [decoded.id],
    );
    req.user = rows[0] || null;
  } catch {
    req.user = null;
  }

  next();
};

module.exports = { protect, requireAdmin, requirePlan, optionalAuth };
