"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation } from "convex/react";
import { Send, MessageCircle, User, Calendar, Sparkles } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useConvex } from "@/lib/convex-provider";

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
  const convex = useConvex();
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  // Fetch entries from Convex
  useEffect(() => {
    async function fetchEntries() {
      try {
        const fetchedEntries = await convex.query(api.guestbook.getEntries);
        if (fetchedEntries && fetchedEntries.length > 0) {
          setEntries(fetchedEntries as GuestbookEntry[]);
        } else {
          setEntries(sampleEntries);
        }
      } catch (error) {
        console.warn("Convex not connected, using fallback data");
        setEntries(sampleEntries);
        setUseFallback(true);
      } finally {
        setIsLoaded(true);
      }
    }
    fetchEntries();
  }, [convex]);

  const addEntryMutation = useMutation(api.guestbook.addEntry);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    try {
      const timestamp = Date.now();
      if (useFallback) {
        // Add to local state only
        const newEntry: GuestbookEntry = {
          _id: Date.now().toString(),
          _creationTime: timestamp,
          name: formData.name.trim(),
          message: formData.message.trim(),
          timestamp,
        };
        setEntries([newEntry, ...entries]);
      } else {
        // Add to Convex
        await addEntryMutation({
          name: formData.name.trim(),
          message: formData.message.trim(),
          timestamp,
        });
        // Refetch entries
        const fetchedEntries = await convex.query(api.guestbook.getEntries);
        setEntries((fetchedEntries as GuestbookEntry[]) || []);
      }
      setFormData({ name: "", message: "" });
    } catch (error) {
      console.error("Failed to add entry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - timestamp;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  if (!isLoaded) {
    return (
      <section id="guestbook" className="relative py-32 bg-[#030712]">
        <div className="container mx-auto max-w-4xl relative z-10 px-6">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-white/10 rounded mb-4" />
            <div className="h-12 w-64 bg-white/10 rounded mb-8" />
            <div className="h-32 bg-white/5 rounded-xl" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="guestbook" className="relative py-32 bg-[#030712]">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10 px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-arc-cyan animate-pulse" />
            <span className="font-mono text-arc-cyan tracking-[0.2em] text-sm uppercase">
              // GUESTBOOK
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Leave Your Mark
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl">
            Got something to say? Drop a message below. Whether it's feedback, collaboration ideas, or just a hello!
          </p>
          {useFallback && (
            <p className="text-yellow-500 text-sm mt-2">
              ⚠️ Using local mode. Connect Convex for persistent storage.
            </p>
          )}
        </div>

        {/* Guestbook Form */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 mb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-500 text-xs font-mono uppercase tracking-wider mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-white/[0.02] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-arc-cyan/50 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-500 text-xs font-mono uppercase tracking-wider mb-2">
                  Your Message
                </label>
                <input
                  type="text"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Great portfolio!"
                  className="w-full px-4 py-3 bg-white/[0.02] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-arc-cyan/50 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-arc-cyan text-black font-bold uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
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

        {/* Messages List */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-arc-cyan" />
            Recent Entries ({entries.length})
          </h3>

          <AnimatePresence initial={false}>
            {entries.map((entry, index) => (
              <motion.div
                key={entry._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/[0.02] border border-white/10 rounded-xl p-6 hover:border-arc-cyan/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-arc-cyan to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-white">{entry.name}</span>
                      <span className="flex items-center gap-1 text-gray-500 text-xs">
                        <Calendar size={12} />
                        {formatDate(entry.timestamp)}
                      </span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{entry.message}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {entries.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <MessageCircle className="-12 mx-autow-12 h mb-4 opacity-50" />
              <p>No messages yet. Be the first to sign!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
