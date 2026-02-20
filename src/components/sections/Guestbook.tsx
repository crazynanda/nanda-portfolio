"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface GuestbookEntry {
  _id: string;
  _creationTime: number;
  name: string;
  message: string;
  timestamp: number;
}

const sampleEntries: GuestbookEntry[] = [
  {
    _id: "1",
    _creationTime: Date.now() - 86400000 * 2,
    name: "Tony Stark",
    message: "Great portfolio! Though I'd say the arc reactor could use some improvements. 😉",
    timestamp: Date.now() - 86400000 * 2,
  },
  {
    _id: "2",
    _creationTime: Date.now() - 86400000,
    name: "J.A.R.V.I.S.",
    message: "Impressive work, sir. Your code quality is 99.7% efficient. The remaining 0.3% appears to be... personality.",
    timestamp: Date.now() - 86400000,
  },
];

// Generate a simple client identifier for rate limiting
const getClientIdentifier = (): string => {
  if (typeof window === "undefined") return "server";
  
  // Try to get existing identifier from sessionStorage
  let identifier = sessionStorage.getItem("guestbook_client_id");
  if (!identifier) {
    // Generate a simple identifier based on browser fingerprint
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    let fingerprint = "";
    
    if (ctx) {
      ctx.textBaseline = "top";
      ctx.font = "14px Arial";
      ctx.fillText("fingerprint", 2, 2);
      fingerprint = canvas.toDataURL().slice(-50);
    }
    
    identifier = `${navigator.userAgent.length}-${screen.width}x${screen.height}-${fingerprint}`;
    sessionStorage.setItem("guestbook_client_id", identifier);
  }
  
  return identifier;
};

export default function Guestbook() {
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch entries from Convex
  const convexEntries = useQuery(api.guestbook.getEntries);
  
  // Mutation for adding entries
  const addEntry = useMutation(api.guestbook.addEntry);

  // Use Convex entries if available, otherwise fall back to sample
  const entries: GuestbookEntry[] = convexEntries && convexEntries.length > 0 
    ? convexEntries as GuestbookEntry[]
    : sampleEntries;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await addEntry({
        name: formData.name.trim(),
        message: formData.message.trim(),
        clientIdentifier: getClientIdentifier(),
      });
      
      setFormData({ name: "", message: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - timestamp) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  if (!isLoaded) {
    return (
      <section id="guestbook" className="py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-4" />
            <div className="h-12 w-64 bg-gray-200 rounded mb-8" />
            <div className="h-32 bg-gray-100 rounded-xl" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="guestbook" className="py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Leave Your Mark</h2>
        <p className="text-gray-600 mb-8">Got something to say? Drop a message below.</p>

        <div className="mb-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  maxLength={100}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Your Message</label>
                <input
                  type="text"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Great portfolio!"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  maxLength={500}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Sign Guestbook"}
              </button>
              {error && <span className="text-red-500 text-sm">{error}</span>}
              {success && <span className="text-green-500 text-sm">Message sent!</span>}
            </div>
          </form>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Recent Entries ({entries.length})</h3>
          <div className="space-y-4">
            {entries.map((entry) => (
              <div key={entry._id} className="py-4 border-b border-gray-100 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{entry.name}</span>
                    <span className="text-xs text-gray-500">{formatDate(entry.timestamp)}</span>
                  </div>
                </div>
                <p className="text-gray-700">{entry.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
