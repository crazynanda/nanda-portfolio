import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Validation constants
const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 500;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_SUBMISSIONS_PER_WINDOW = 3;

// In-memory rate limiting store (resets on server restart)
// For production, consider using Convex's rate limiting package
const rateLimitStore = new Map<string, { count: number; windowStart: number }>();

// Sanitize user input to prevent XSS
const sanitizeString = (str: string): string => {
  return str
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
};

// Check if rate limited
const checkRateLimit = (identifier: string): { allowed: boolean; remainingTime: number } => {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);
  
  if (!entry) {
    rateLimitStore.set(identifier, { count: 1, windowStart: now });
    return { allowed: true, remainingTime: 0 };
  }
  
  // Reset window if expired
  if (now - entry.windowStart > RATE_LIMIT_WINDOW) {
    rateLimitStore.set(identifier, { count: 1, windowStart: now });
    return { allowed: true, remainingTime: 0 };
  }
  
  // Check if over limit
  if (entry.count >= MAX_SUBMISSIONS_PER_WINDOW) {
    const remainingTime = RATE_LIMIT_WINDOW - (now - entry.windowStart);
    return { allowed: false, remainingTime };
  }
  
  // Increment count
  entry.count++;
  return { allowed: true, remainingTime: 0 };
};

// Get all guestbook entries, sorted by timestamp descending
export const getEntries = query({
  args: {},
  handler: async (ctx) => {
    const entries = await ctx.db
      .query("guestbook")
      .withIndex("by_timestamp")
      .collect();
    return entries.reverse(); // Most recent first
  },
});

// Add a new guestbook entry with validation and rate limiting
export const addEntry = mutation({
  args: {
    name: v.string(),
    message: v.string(),
    clientIdentifier: v.string(), // Simple identifier for rate limiting
  },
  handler: async (ctx, args) => {
    // Rate limit check
    const rateCheck = checkRateLimit(args.clientIdentifier);
    if (!rateCheck.allowed) {
      const remainingSeconds = Math.ceil(rateCheck.remainingTime / 1000);
      throw new Error(`Rate limit exceeded. Please wait ${remainingSeconds} seconds before submitting again.`);
    }

    // Validate name
    if (!args.name || args.name.trim().length === 0) {
      throw new Error("Name is required");
    }
    if (args.name.length > MAX_NAME_LENGTH) {
      throw new Error(`Name must be ${MAX_NAME_LENGTH} characters or less`);
    }

    // Validate message
    if (!args.message || args.message.trim().length === 0) {
      throw new Error("Message is required");
    }
    if (args.message.length > MAX_MESSAGE_LENGTH) {
      throw new Error(`Message must be ${MAX_MESSAGE_LENGTH} characters or less`);
    }

    // Sanitize and insert
    const sanitizedEntry = {
      name: sanitizeString(args.name),
      message: sanitizeString(args.message),
      timestamp: Date.now(),
    };

    const id = await ctx.db.insert("guestbook", sanitizedEntry);
    return { success: true, id };
  },
});
