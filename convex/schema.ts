import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  guestbook: defineTable({
    name: v.string(),
    message: v.string(),
    timestamp: v.number(),
  }).index("by_timestamp", ["timestamp"]),
});
