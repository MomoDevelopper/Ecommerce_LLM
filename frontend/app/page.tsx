"use client";

import { useState } from "react";

type Msg = {
  role: "user" | "bot";
  text: string;
};

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim()) return;

    const userMsg: Msg = { role: "user", text: input };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://frontend-1-61z3.onrender.com";
      const res = await fetch(`${backendUrl}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: input }),
      });

      const data = await res.json();

      setMessages(m => [
        ...m,
        { role: "bot", text: data.result }
      ]);
    } catch {
      setMessages(m => [
        ...m,
        { role: "bot", text: "Backend indisponible." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="header">
        🤖 Momo AI
      </div>

      <div className="wrapper">
        <div className="chat-box">

          <div className="messages">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>
                {m.role === "bot" ? (
                  <div className="bot-message-content">
                    {m.text.split('\n').map((line, idx) => {
                      // Transformer les markdown en HTML simple
                      if (line.startsWith('##')) {
                        return <h3 key={idx}>{line.replace(/^#+\s/, '')}</h3>;
                      }
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return <strong key={idx}>{line.replace(/\*\*/g, '')}</strong>;
                      }
                      if (line.startsWith('-')) {
                        return <li key={idx}>{line.replace(/^-\s/, '')}</li>;
                      }
                      if (line.trim()) {
                        return <p key={idx}>{line}</p>;
                      }
                      return null;
                    })}
                  </div>
                ) : (
                  m.text
                )}
              </div>
            ))}
            {loading && <div className="msg bot loading">⏳ Génération en cours...</div>}
          </div>

          <div className="input-zone">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Écris un nom de produit..."
              onKeyDown={e => e.key === "Enter" && !loading && send()}
              disabled={loading}
            />
            <button onClick={send} disabled={loading}>
              {loading ? "⏳" : "Envoyer"}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
