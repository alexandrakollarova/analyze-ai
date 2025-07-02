"use client";

import { useState, useEffect } from "react";
import Button from "@/design-system/components/Button";
import Card from "@/design-system/components/Card";
import { SendIcon, BotIcon, UserIcon } from "lucide-react";
import Input from "@/design-system/components/Input";
import IconButton from "@/design-system/components/IconButton";

type Message = {
  role: "user" | "ai";
  content: string;
};

type ChatBoxProps = {
  data: Record<string, unknown>[]; // Parsed CSV or JSON data
};

const AGENT_ICON = (
  <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-primary/10 text-primary">
    <BotIcon size={20} />
  </span>
);
const USER_AVATAR = (
  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-light text-gray">
    <UserIcon size={20} />
  </span>
);

export default function ChatBox({ data }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sampleQuestions, setSampleQuestions] = useState<string[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const columns = Object.keys(data[0]).filter(
        (col) => typeof data[0][col] === "number" || typeof data[0][col] === "string"
      );
      const templates = [
        "What is the average {col}?",
        "Show the sum of {col} by category.",
        "List all unique values in {col}.",
        "What is the maximum {col}?",
        "What is the minimum {col}?",
      ];
      const questions = columns.flatMap((col) =>
        templates.map((tpl) => tpl.replace("{col}", col))
      );
      setSampleQuestions(questions.slice(0, 8)); // Limit to 8
    } else {
      setSampleQuestions([]);
    }
  }, [data]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input, data }),
      });

      const { answer } = await res.json();
      setMessages((prev) => [...prev, { role: "ai", content: answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Error fetching response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="p-6 pb-2">
        {messages.length === 0 && (
          <div className="text-gray text-center mb-4">Ask anything about your data…</div>
        )}
        <div className="space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className="flex items-start gap-3">
              {msg.role === "user" ? (
                <>
                  {USER_AVATAR}
                  <div className="bg-gray-light rounded-xl px-4 py-3 text-gray-dark max-w-[80%]">
                    <div className="font-semibold mb-1">You</div>
                    <div>{msg.content}</div>
                  </div>
                </>
              ) : (
                <>
                  {AGENT_ICON}
                  <div className="bg-white border border-gray-light rounded-xl px-4 py-3 text-gray-dark max-w-[80%]">
                    <div className="font-semibold mb-1 text-primary">Assistant</div>
                    <div>{msg.content}</div>
                  </div>
                </>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex items-start gap-3">
              {AGENT_ICON}
              <div className="bg-white border border-gray-light rounded-xl px-4 py-3 text-gray-dark max-w-[80%]">
                <div className="font-semibold mb-1 text-primary">Assistant</div>
                <div className="italic text-gray">Thinking…</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <form
        className="flex items-center gap-2 border-t border-gray-light bg-gray-lighter px-4 py-3 rounded-b-2xl"
        onSubmit={e => { e.preventDefault(); sendMessage(); }}
      >
        <Input
          type="text"
          placeholder="Ask anything…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <IconButton type="submit" disabled={loading || !input.trim()} variant="primary" icon={<SendIcon size={20} className="text-white" />} aria-label="Send message" />
      </form>
      <div className="text-xs text-gray text-center mt-1 mb-2">⌘ ↵ to send</div>
      {sampleQuestions.length > 0 && (
        <div className="px-6 pb-4 pt-2">
          <div className="text-xs text-gray mb-2 font-medium">Sample Questions</div>
          <div className="flex flex-wrap gap-2">
            {sampleQuestions.map((q, i) => (
              <button
                key={i}
                type="button"
                className="px-3 py-1 rounded-full bg-gray-light text-gray-dark text-xs font-medium hover:bg-primary/10 hover:text-primary transition"
                onClick={() => setInput(q)}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
