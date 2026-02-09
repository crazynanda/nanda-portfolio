"use client";

import { useState, useEffect } from "react";
import { Send } from "lucide-react";

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

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("nanda-portfolio-guestbook");
    if (stored) {
      try {
        setEntries(JSON.parse(stored));
      } catch {
        setEntries(sampleEntries);
      }
    } else {
      setEntries(sampleEntries);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("nanda-portfolio-guestbook", JSON.stringify(entries));
    }
  }, [entries, isLoaded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newEntry: GuestbookEntry = {
      _id: Date.now().toString(),
      _creationTime: Date.now(),
      name: formData.name.trim(),
      message: formData.message.trim(),
      timestamp: Date.now(),
    };

    setEntries([newEntry, ...entries]);
    setFormData({ name: "", message: "" });
    setIsSubmitting(false);
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
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Sign Guestbook"}
            </button>
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
