"use client";

import { useState, useEffect } from "react";
import Button from "@/design-system/components/Button";
import Card from "@/design-system/components/Card";
import { SendIcon, BotIcon, UserIcon } from "lucide-react";
import Input from "@/design-system/components/Input";
import IconButton from "@/design-system/components/IconButton";
import ChartRenderer from "./ChartRenderer";
import Alert from "@/design-system/components/Alert";

// --- Types ---
type Message = {
  role: "user" | "ai";
  content: string;
  dataFrame?: Record<string, unknown>[];
};

type ChatBoxProps = {
  data: Record<string, unknown>[]; // Parsed CSV or JSON data
};

// --- Constants ---
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

// --- Component ---
export default function ChatBox({ data }: ChatBoxProps) {
  // --- State ---
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sampleQuestions, setSampleQuestions] = useState<string[]>([]);
  const TOKEN_LIMIT = 4096;
  const [tokenError, setTokenError] = useState(false);

  // --- Effects ---
  useEffect(() => {
    // Only generate sampleQuestions if there is uploaded data (files)
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

  // --- Handlers ---
  const sendMessage = async () => {
    if (!input.trim()) return;
    // Estimate tokens for this message
    const usageStats = JSON.parse(localStorage.getItem("usageStats") || "{}");
    const tokensUsed = usageStats.tokens || 0;
    const tokensThisMsg = Math.round(input.length / 4);
    if (tokensUsed + tokensThisMsg > TOKEN_LIMIT) {
      setTokenError(true);
      return;
    } else {
      setTokenError(false);
    }

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

      const { answer, dataFrame } = await res.json();
      setMessages((prev) => [...prev, { role: "ai", content: answer, dataFrame }]);
      // Increment usage stats
      const newMessages = (usageStats.messages || 0) + 1;
      const newTokens = (usageStats.tokens || 0) + Math.round(input.length / 4 + (answer?.length || 0) / 4);
      localStorage.setItem("usageStats", JSON.stringify({ messages: newMessages, tokens: newTokens }));
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

  // --- Render ---
  return (
    <Card className="max-w-2xl mx-auto">
      <div className="p-6 pb-2">
        {messages.length === 0 && (
          <div className="text-gray text-center mb-4">Ask anything about your data…</div>
        )}
        <div className="space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex items-start gap-3">
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
              {/* {msg.dataFrame && Array.isArray(msg.dataFrame) && msg.dataFrame.length > 0 && (
                <div className="ml-12">
                  <ChartRenderer
                    data={msg.dataFrame}
                    xKey={Object.keys(msg.dataFrame[0])[0]}
                    yKey={Object.keys(msg.dataFrame[0])[1]}
                  />
                </div>
              )} */}
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
      {tokenError && (
        <div className="px-6 pb-2">
          <Alert severity="error">You have reached the token limit. Please start a new session or clear usage.</Alert>
        </div>
      )}
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
