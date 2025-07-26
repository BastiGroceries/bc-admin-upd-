import { RequestHandler } from "express";

// Admin credentials
const ADMIN_USERNAME = "bc";
const ADMIN_PASSWORD = "HardikSri@123";

// Staff credentials
const STAFF_USERS = [
  { username: "bc-s=1", password: "bc-p=yash" }
];

// Simple session storage (in production, use proper session management)
let activeSessions: Map<string, { type: 'admin' | 'staff', username: string }> = new Map();

// Generate session token
const generateSessionToken = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Admin login
export const adminLogin: RequestHandler = (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate session token
    const sessionToken = generateSessionToken();
    activeSessions.set(sessionToken, { type: 'admin', username });

    res.json({
      success: true,
      sessionToken,
      userType: 'admin',
      message: "Login successful"
    });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Staff login
export const staffLogin: RequestHandler = (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    // Check staff credentials
    const staffUser = STAFF_USERS.find(user => user.username === username && user.password === password);
    if (!staffUser) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate session token
    const sessionToken = generateSessionToken();
    activeSessions.set(sessionToken, { type: 'staff', username });

    res.json({
      success: true,
      sessionToken,
      userType: 'staff',
      message: "Login successful"
    });
  } catch (error) {
    console.error("Error during staff login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Admin logout
export const adminLogout: RequestHandler = (req, res) => {
  try {
    const { sessionToken } = req.body;

    if (sessionToken && activeSessions.has(sessionToken)) {
      activeSessions.delete(sessionToken);
    }

    res.json({ 
      success: true, 
      message: "Logout successful" 
    });
  } catch (error) {
    console.error("Error during admin logout:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Verify admin session
export const verifyAdminSession: RequestHandler = (req, res) => {
  try {
    const { sessionToken } = req.body;

    if (!sessionToken || !activeSessions.has(sessionToken)) {
      return res.status(401).json({ error: "Invalid or expired session" });
    }

    res.json({ 
      success: true, 
      valid: true,
      message: "Session is valid" 
    });
  } catch (error) {
    console.error("Error verifying admin session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
