import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  submitContact,
  subscribeNewsletter,
  getContactMessages,
  getContactMessage,
  getNewsletterSubscriptions
} from "./routes/contact";
import { adminLogin, adminLogout, verifyAdminSession } from "./routes/auth";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Contact form routes
  app.post("/api/contact", submitContact);
  app.post("/api/newsletter", subscribeNewsletter);

  // Authentication routes
  app.post("/api/admin/login", adminLogin);
  app.post("/api/admin/logout", adminLogout);
  app.post("/api/admin/verify", verifyAdminSession);

  // Admin routes
  app.get("/api/admin/messages", getContactMessages);
  app.get("/api/admin/messages/:id", getContactMessage);
  app.get("/api/admin/newsletter", getNewsletterSubscriptions);

  return app;
}
