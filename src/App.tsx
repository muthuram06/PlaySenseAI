
import { useState } from "react";
import "./App.css";

type Message = {
  role: "user" | "ai";
  text: string;
};

type ChatResponse = {
  success: boolean;
  answer?: string;
  error?: string;
  source?: string;
  isDemoData?: boolean;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const initialMessages: Message[] = [
  {
    role: "ai",
    text: "Hi! I'm PlaySense AI. Ask me about the match, player statistics, strike rates, or possible batting strategies.",
  },
];

const suggestions = [
  "Explain the current match situation",
  "Who is the top scorer?",
  "Explain Arjun's strike rate",
  "Suggest a batting strategy",
];

function App() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState("");

  async function askQuestion(text: string) {
    const prompt = text.trim();

    if (!prompt || loading) return;

    setMessages((current) => [
      ...current,
      { role: "user", text: prompt },
      { role: "ai", text: "Thinking through your question..." },
    ]);

    setQuestion("");
    setLoading(true);
    setSource("");

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: prompt }),
      });

      const result: ChatResponse = await response.json();

      if (!response.ok || !result.success || !result.answer) {
        throw new Error(result.error || "Unable to answer right now.");
      }

      setMessages((current) => {
        const updated = [...current];

        updated[updated.length - 1] = {
          role: "ai",
          text: result.answer as string,
        };

        return updated;
      });

      setSource(
        result.source === "gemini"
          ? "Powered by Gemini"
          : "Local demo response",
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to connect to the backend.";

      setMessages((current) => {
        const updated = [...current];

        updated[updated.length - 1] = {
          role: "ai",
          text: `Couldn't connect to PlaySense AI: ${errorMessage}. Please check that the backend is running on port 5000.`,
        };

        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void askQuestion(question);
  }

  return (
    <div className="app-shell" id="home">
      <aside className="sidebar">
        <a className="brand" href="#home">
          <span className="brand-icon">P</span>
          <span>
            <strong>PlaySense</strong>
            <small>AI FAN COMPANION</small>
          </span>
        </a>

        <div className="sidebar-label">WORKSPACE</div>

        <a className="nav-item active" href="#home">
          <span>◈</span> Match Center
        </a>

        <a className="nav-item" href="#players">
          <span>♙</span> Player Explorer
        </a>

        <a className="nav-item" href="#insights">
          <span>⌁</span> Match Insights
        </a>

        <a className="nav-item" href="#companion">
          <span>✳</span> AI Companion
        </a>

        <div className="sidebar-bottom">
          <span className="online-dot" />
          Demo environment
          <small>Fictional match data</small>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <div className="eyebrow">LIVE EXPERIENCE / CRICKET</div>
            <h1>Match Center</h1>
          </div>

          <span className="demo-badge">
            <span className="online-dot" /> DEMO MATCH
          </span>
        </header>

        <section className="welcome">
          <div>
            <div className="eyebrow">
              YOUR PERSONAL SPORTS COMPANION
            </div>

            <h2>
              Every player has a story.
              <br />
              <span>Every moment has a meaning.</span>
            </h2>

            <p>
              Explore the numbers, understand the game, and discover
              the thinking behind every moment.
            </p>
          </div>

          <div className="welcome-mark">
            PS<span>✳</span>
          </div>
        </section>

        <section className="score-card">
          <div className="score-heading">
            <span>DEMO LEAGUE · T20</span>
            <span className="live-label">● MATCH IN PROGRESS</span>
          </div>

          <div className="score-main">
            <div className="team">
              <div className="team-emblem falcons">MF</div>
              <strong>Metro Falcons</strong>
              <small>Batting</small>
            </div>

            <div className="score">
              <h2>
                126<span>/3</span>
              </h2>
              <p>13.0 overs</p>
            </div>

            <div className="team">
              <div className="team-emblem titans">CT</div>
              <strong>Coastal Titans</strong>
              <small>Bowling</small>
            </div>
          </div>

          <div className="score-stats">
            <div>
              <small>Current run rate</small>
              <strong>9.69</strong>
            </div>

            <div>
              <small>Overs remaining</small>
              <strong>7.0</strong>
            </div>

            <div>
              <small>Wickets remaining</small>
              <strong>7</strong>
            </div>
          </div>

          <p className="disclaimer">
            Illustrative scores and players for product demonstration only.
          </p>
        </section>

        <section className="section" id="players">
          <div className="section-heading">
            <div>
              <div className="eyebrow">THE PEOPLE BEHIND THE NUMBERS</div>
              <h2>Player Explorer</h2>
            </div>

            <span className="muted">3 featured players</span>
          </div>

          <div className="player-grid">
            <article className="player-card">
              <div className="player-avatar avatar-one">AM</div>
              <div className="player-role">OPENING BATTER</div>
              <h3>Arjun Mehta</h3>
              <div className="player-runs">
                58 <small>runs</small>
              </div>
              <div className="player-detail">
                <span>34 balls</span>
                <strong>SR 170.59</strong>
              </div>
              <div className="progress">
                <span style={{ width: "85%" }} />
              </div>
            </article>

            <article className="player-card">
              <div className="player-avatar avatar-two">DK</div>
              <div className="player-role">MIDDLE ORDER</div>
              <h3>Dev Kapoor</h3>
              <div className="player-runs">
                32 <small>runs</small>
              </div>
              <div className="player-detail">
                <span>21 balls</span>
                <strong>SR 152.38</strong>
              </div>
              <div className="progress">
                <span style={{ width: "70%" }} />
              </div>
            </article>

            <article className="player-card">
              <div className="player-avatar avatar-three">RI</div>
              <div className="player-role">ALL-ROUNDER</div>
              <h3>Rohan Iyer</h3>
              <div className="player-runs">
                14 <small>runs</small>
              </div>
              <div className="player-detail">
                <span>9 balls</span>
                <strong>SR 155.56</strong>
              </div>
              <div className="progress">
                <span style={{ width: "58%" }} />
              </div>
            </article>
          </div>
        </section>

        <section className="insights-section" id="insights">
          <div>
            <div className="eyebrow">QUICK READ</div>
            <h2>What the numbers tell us</h2>
            <p>
              Metro Falcons are scoring at 9.69 runs per over. With
              seven overs left and seven wickets in hand, they have
              room to build their total, though the outcome depends
              on conditions and bowling matchups.
            </p>
          </div>

          <div className="insight-highlight">
            <span>KEY PLAYER</span>
            <strong>Arjun Mehta</strong>
            <p>58 runs · Strike rate 170.59</p>
          </div>
        </section>

        <section className="chat-section" id="companion">
          <div className="section-heading">
            <div>
              <div className="eyebrow">ASK. EXPLORE. UNDERSTAND.</div>
              <h2>Talk to PlaySense AI</h2>
              <p className="muted">
                Your match companion, ready to explain the game.
              </p>
            </div>

            <span className="ai-symbol">✳</span>
          </div>

          <div className="chat-window" aria-live="polite">
            {messages.map((message, index) => (
              <div
                className={`message-row ${message.role}`}
                key={`${index}-${message.role}`}
              >
                {message.role === "ai" && (
                  <div className="chat-avatar">PS</div>
                )}

                <div className="message-bubble">
                  <small>
                    {message.role === "ai" ? "PLAYSENSE AI" : "YOU"}
                  </small>
                  <p>{message.text}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="loading-indicator">
                <span />
                <span />
                <span />
                <small>Analyzing the question...</small>
              </div>
            )}
          </div>

          <div className="suggestions">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                className="suggestion"
                disabled={loading}
                onClick={() => void askQuestion(suggestion)}
                type="button"
              >
                {suggestion} <span>↗</span>
              </button>
            ))}
          </div>

          <form className="chat-form" onSubmit={handleSubmit}>
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask anything about the match..."
              aria-label="Ask PlaySense AI a question"
              maxLength={500}
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading || !question.trim()}
            >
              {loading ? "Thinking..." : "Ask AI ↗"}
            </button>
          </form>

          <div className="chat-footer">
            <span>Answers use fictional demo match data.</span>
            {source && <span>{source}</span>}
          </div>
        </section>

        <footer className="footer">
          <span>PlaySense AI</span>
          <span>Every moment has a meaning.</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
