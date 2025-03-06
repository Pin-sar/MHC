import express from "express";
import { OpenAI } from "openai";

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: "1234567890", // Replace with your OpenAI API key
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  const systemPrompt = `You are PINGU, an advanced AI therapist named with a compassionate, warm personality. 
  Your communication style is:
  - Empathetic and supportive
  - Conversational and natural
  - Gentle and understanding
  - Focused on emotional well-being
  - Professional yet caring

  Key Interaction Goals:
  1. Create a safe, non-judgmental space
  2. Listen actively and reflectively
  3. Provide emotional validation
  4. Offer gentle coping strategies
  5. Recognize and respond to emotional nuances`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4", // Use "gpt-3.5-turbo" if GPT-4 is not available
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 300
    });

    const aiResponse = completion.choices[0].message.content || 
      "I'm here to listen. Tell me more about what you're experiencing.";

    const lowRiskKeywords = ['sad', 'stressed', 'anxious', 'worried'];
    const highRiskKeywords = ['suicide', 'kill myself', 'want to die', 'hopeless'];

    const response = {
      response: aiResponse,
      type: highRiskKeywords.some(keyword => 
        message.toLowerCase().includes(keyword)) 
        ? 'crisis' 
        : lowRiskKeywords.some(keyword => 
            message.toLowerCase().includes(keyword)) 
          ? 'sensitive' 
          : 'standard'
    };

    res.json(response);
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({
      response: "I sense you're going through something challenging. I'm here to support you.",
      type: 'error'
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
