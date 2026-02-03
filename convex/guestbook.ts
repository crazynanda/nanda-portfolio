import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

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

// Add a new guestbook entry
export const addEntry = mutation({
  args: {
    name: v.string(),
    message: v.string(),
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("guestbook", {
      name: args.name,
      message: args.message,
      timestamp: args.timestamp,
    });
  },
});
