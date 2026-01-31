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
    setMessages((m: Msg[]) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://ecommerce-llm.onrender.com";
      const res = await fetch(`${backendUrl}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: input }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        let errorMessage = "Une erreur est survenue.";
        
        // Gestion spécifique de l'erreur 429 (quota dépassé)
        if (res.status === 429 || errorData.result?.includes("429") || errorData.result?.includes("quota")) {
          errorMessage = "⚠️ Quota API dépassé. Le service a atteint sa limite d'utilisation. Veuillez réessayer plus tard ou vérifier votre plan API Gemini.";
        } else if (res.status === 400) {
          errorMessage = "Erreur de requête. Veuillez vérifier votre saisie.";
        } else if (res.status >= 500) {
          errorMessage = "Erreur serveur. Veuillez réessayer plus tard.";
        } else if (errorData.result) {
          errorMessage = errorData.result;
        }
        
        setMessages((m: Msg[]) => [
          ...m,
          { role: "bot", text: errorMessage }
        ]);
        return;
      }

      const data = await res.json();

      setMessages((m: Msg[]) => [
        ...m,
        { role: "bot", text: data.result }
      ]);
    } catch (error) {
      setMessages((m: Msg[]) => [
        ...m,
        { role: "bot", text: "Backend indisponible. Vérifiez votre connexion internet." }
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
          
          {messages.length === 0 && (
            <div className="welcome-message">
              <p>Entrez le nom de votre produit E-commerce pour recevoir une description.</p>
            </div>
          )}

          <div className="messages">
            {messages.map((m: Msg, i: number) => (
              <div key={i} className={`msg ${m.role}`}>
                {m.role === "bot" ? (
                  <div className="bot-message-content">
                    {m.text.split('\n').map((line: string, idx: number) => {
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
              placeholder="Écris un nom de produit..."
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && !loading && send()}
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
