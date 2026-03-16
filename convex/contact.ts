import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const submitContact = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    projectType: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const { firstName, lastName, email, phone, projectType, message } = args;
    
    // Validate inputs
    if (!firstName || !lastName || !email || !projectType || !message) {
      throw new Error("All required fields must be filled");
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }
    
    // Store the contact submission
    const contactId = await ctx.db.insert("contacts", {
      firstName,
      lastName,
      email,
      phone: phone || "",
      projectType,
      message,
      timestamp: Date.now(),
    });
    
    return { success: true, id: contactId };
  },
});
