"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Mail, Check, Trash2, RefreshCw, MessageSquare, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ContactMessageItem {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageItem | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages);
        setSelectedMessage((prev) => prev || data.messages[0] || null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const toggleReadStatus = async (msg: ContactMessageItem) => {
    const updatedStatus = !msg.isRead;
    try {
      await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: msg.id, isRead: updatedStatus }),
      });
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, isRead: updatedStatus } : m))
      );
      if (selectedMessage?.id === msg.id) {
        setSelectedMessage({ ...selectedMessage, isRead: updatedStatus });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await fetch("/api/admin/messages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const filtered = messages.filter((m) => m.id !== id);
      setMessages(filtered);
      if (selectedMessage?.id === id) {
        setSelectedMessage(filtered[0] || null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="peach">Communications</Badge>
            <span className="text-xs font-mono text-foreground/50">
              {messages.filter((m) => !m.isRead).length} Unread
            </span>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mt-1">
            Contact Inquiries & Leads
          </h1>
        </div>

        <Button variant="outline" size="sm" onClick={fetchMessages} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Messages List (5 cols) */}
        <div className="lg:col-span-5 space-y-2">
          {loading ? (
            <Card variant="glass" className="p-8 text-center text-xs text-foreground/50">
              Loading inquiries...
            </Card>
          ) : messages.length === 0 ? (
            <Card variant="glass" className="p-8 text-center space-y-2">
              <MessageSquare className="h-8 w-8 text-neutral-400 mx-auto" />
              <p className="text-sm font-semibold text-foreground">No inquiries found</p>
              <p className="text-xs text-foreground/50">Messages sent via the website will appear here.</p>
            </Card>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => setSelectedMessage(msg)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedMessage?.id === msg.id
                    ? "bg-warm-100 dark:bg-canvas-charcoal border-accent-ember/60 shadow-md"
                    : "bg-white/60 dark:bg-canvas-charcoal/60 border-neutral-200/80 dark:border-neutral-800 hover:bg-warm-50 dark:hover:bg-neutral-800/40"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-display text-xs font-bold text-foreground truncate">
                    {msg.name}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {!msg.isRead && (
                      <span className="h-2 w-2 rounded-full bg-accent-ember" />
                    )}
                    <span className="text-[10px] font-mono text-foreground/40">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <p className="text-xs font-semibold text-foreground/90 truncate">{msg.subject}</p>
                <p className="text-xs text-foreground/55 line-clamp-1 mt-0.5">{msg.message}</p>
              </div>
            ))
          )}
        </div>

        {/* Selected Message Detail (7 cols) */}
        <div className="lg:col-span-7">
          {selectedMessage ? (
            <Card variant="glass" className="p-6 sm:p-8 space-y-6 border border-neutral-200/80 dark:border-neutral-800">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-200/70 dark:border-neutral-800/70">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      selectedMessage.isRead ? "bg-emerald-500/10 text-emerald-600" : "bg-accent-ember text-white"
                    }`}>
                      {selectedMessage.isRead ? "Read" : "New Inquiry"}
                    </span>
                    <span className="text-xs font-mono text-foreground/40">
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    {selectedMessage.subject}
                  </h2>
                  <p className="text-xs text-foreground/70">
                    From: <strong className="text-foreground">{selectedMessage.name}</strong> &lt;{selectedMessage.email}&gt;
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleReadStatus(selectedMessage)}
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">
                      {selectedMessage.isRead ? "Mark Unread" : "Mark Read"}
                    </span>
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Message Body */}
              <div className="p-5 rounded-2xl bg-white/70 dark:bg-neutral-900/60 border border-neutral-200/70 dark:border-neutral-800 text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>

              {/* Quick Actions for this sender */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(`Re: ${selectedMessage.subject}`)}`}>
                  <Button variant="primary" size="sm">
                    <Mail className="h-3.5 w-3.5" />
                    <span>Reply via Email</span>
                  </Button>
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Hello ${selectedMessage.name}, thank you for reaching out regarding: ${selectedMessage.subject}`)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Open WhatsApp</span>
                  </Button>
                </a>
              </div>
            </Card>
          ) : (
            <Card variant="glass" className="p-12 text-center text-xs text-foreground/50 border border-neutral-200 dark:border-neutral-800">
              Select an inquiry from the left panel to inspect details.
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
