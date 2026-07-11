export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are OxyNeuro AI, an intelligent assistant for coding, AI, web development, and learning.

User: ${message}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    res.status(200).json({
      reply:
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response.",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
      }
