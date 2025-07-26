import { RequestHandler } from "express";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NewsletterSubscription {
  id: string;
  email: string;
  timestamp: Date;
}

// In-memory storage (in production, you'd use a database)
let contactMessages: ContactMessage[] = [];
let newsletterSubscriptions: NewsletterSubscription[] = [];

// Generate 10-digit ID
const generateId = (): string => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

// Submit contact form
export const submitContact: RequestHandler = (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const id = generateId();
    const contactMessage: ContactMessage = {
      id,
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      timestamp: new Date(),
      read: false
    };

    contactMessages.push(contactMessage);

    res.json({ 
      success: true, 
      message: "Contact form submitted successfully",
      id 
    });
  } catch (error) {
    console.error("Error submitting contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Subscribe to newsletter
export const subscribeNewsletter: RequestHandler = (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if email already exists
    const existingSubscription = newsletterSubscriptions.find(sub => sub.email === email.trim());
    if (existingSubscription) {
      return res.status(409).json({ error: "Email already subscribed" });
    }

    const id = generateId();
    const subscription: NewsletterSubscription = {
      id,
      email: email.trim(),
      timestamp: new Date()
    };

    newsletterSubscriptions.push(subscription);

    res.json({ 
      success: true, 
      message: "Successfully subscribed to newsletter" 
    });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all contact messages (admin)
export const getContactMessages: RequestHandler = (req, res) => {
  try {
    const messages = contactMessages
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .map(msg => ({
        id: msg.id,
        name: msg.name,
        email: msg.email,
        subject: msg.subject,
        timestamp: msg.timestamp,
        read: msg.read
      }));

    res.json({ messages });
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get specific contact message (admin)
export const getContactMessage: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const message = contactMessages.find(msg => msg.id === id);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // Mark as read
    message.read = true;

    res.json({ message });
  } catch (error) {
    console.error("Error fetching contact message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get newsletter subscriptions (admin)
export const getNewsletterSubscriptions: RequestHandler = (req, res) => {
  try {
    const subscriptions = newsletterSubscriptions
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    res.json({ subscriptions });
  } catch (error) {
    console.error("Error fetching newsletter subscriptions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
