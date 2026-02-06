"use client";

import { useState, useEffect } from "react";
import { Send, MessageCircle, User, Calendar } from "lucide-react";

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
      <section id="guestbook" className="py-20 bg-white">
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
    <section id="guestbook" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Leave Your Mark
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl">
          Got something to say? Drop a message below. Whether it's feedback, collaboration ideas, or just a hello!
        </p>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Your Message
                </label>
                <input
                  type="text"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Great portfolio!"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold uppercase tracking-wider rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Sign Guestbook
                </>
              )}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <h3 className="text-gray-900 font-semibold flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            Recent Entries ({entries.length})
          </h3>

          {entries.map((entry) => (
            <div
              key={entry._id}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-gray-900">{entry.name}</span>
                    <span className="flex items-center gap-1 text-gray-500 text-xs">
                      <Calendar size={12} />
                      {formatDate(entry.timestamp)}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{entry.message}</p>
                </div>
              </div>
            </div>
          ))}

          {entries.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No messages yet. Be the first to sign!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
