
async function askQuestion(text: string) {
  const prompt = text.trim();
  if (!prompt) return;

  setMessages((current) => [
    ...current,
    { role: "user", text: prompt },
    { role: "ai", text: "Thinking through your question..." },
  ]);
  setQuestion("");

  try {
    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: prompt }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || "Unable to answer right now.");
    }

    setMessages((current) => {
      const updated = [...current];
      updated[updated.length - 1] = {
        role: "ai",
        text: result.answer,
      };
      return updated;
    });
  } catch (error) {
    setMessages((current) => {
      const updated = [...current];
      updated[updated.length - 1] = {
        role: "ai",
        text:
          error instanceof Error
            ? `I couldn't reach the backend: ${error.message}. Check that your backend is running on port 5000.`
            : "Unable to connect to the backend. Please try again.",
      };
      return updated;
    });
  }
}
