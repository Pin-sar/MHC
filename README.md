<img width="447" alt="Screenshot 2025-03-06 at 3 59 26 PM" src="https://github.com/user-attachments/assets/e4234b58-444e-44c6-896e-b2ef80e48017" />

---

# 🧠 PINGU – AI-Powered Mental Health Chatbot

PINGU is a web-based AI mental health assistant designed to provide **empathetic, supportive, and non-judgmental conversations**. It combines a clean chat interface, voice input/output, and an AI backend to simulate a compassionate therapist-like experience.

> ⚠️ **Disclaimer:**
> PINGU is **not a replacement for professional mental health care**. It is intended for emotional support and educational purposes only.

---

## ✨ Features

* 💬 **Conversational AI Chatbot** with a warm, empathetic personality
* 🎙️ **Voice Input (Speech-to-Text)** using browser Speech Recognition
* 🔊 **Voice Output (Text-to-Speech)** for AI responses
* 🧠 **Emotion-Aware Responses**

  * Detects sensitive and crisis-related keywords
  * Adjusts response tone accordingly
* 🚨 **Crisis Support Resources** embedded directly in the UI
* 📱 **Mobile-First UI** inspired by modern assistant apps (Siri-like design)

---

## 🛠️ Tech Stack

### Frontend

* **React (JavaScript)**
* **HTML5**
* **CSS3**
* Web Speech API (Speech Recognition & Speech Synthesis)

### Backend

* **Node.js**
* **Express.js**
* **OpenAI API (GPT-based model)**

---

## 📁 Project Structure

```
mental-health-chatbot/
│
├── index.html        # Entry HTML file
├── app.js            # React frontend logic
├── style.css         # UI styling
├── server.js         # Express + OpenAI backend
└── README.md         # Project documentation
```

---

## ⚙️ How It Works

1. User types or speaks a message.
2. Frontend sends the message to the backend (`/chat` API).
3. Backend:

   * Uses a **custom system prompt** to ensure empathetic responses
   * Classifies the message as `standard`, `sensitive`, or `crisis`
4. AI response is returned to the frontend.
5. Response is:

   * Displayed in chat
   * Read aloud using Text-to-Speech
6. Emergency resources are always visible for safety.

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/mental-health-chatbot.git
cd mental-health-chatbot
```

---

### 2️⃣ Install Backend Dependencies

```bash
npm install express openai
```

---

### 3️⃣ Add Your OpenAI API Key

In `server.js`, replace:

```js
apiKey: "1234567890"
```

with:

```js
apiKey: "YOUR_OPENAI_API_KEY"
```

> ⚠️ **Never commit your real API key to GitHub**

---

### 4️⃣ Start the Backend Server

```bash
node server.js
```

Server will run at:

```
http://localhost:3000
```

---

### 5️⃣ Run the Frontend

Simply open `index.html` in your browser
(or use a local server like Live Server in VS Code).

---

## 🔐 Safety & Ethics

* The chatbot **does not diagnose** mental health conditions.
* Crisis-related keywords trigger **gentler responses**.
* Emergency support numbers are **always displayed**.
* Designed to promote **support, not dependency**.

---

## 🌱 Future Improvements

* User authentication & session history
* Mood tracking & analytics
* Multi-language support
* Safer crisis escalation logic
* Deployment (Vercel + Render)
* Secure environment variable handling
* Fine-tuned mental health–specific models

---

## 📜 License

This project is open-source and intended for **educational and research purposes**.

---

## 🙌 Acknowledgements

* OpenAI for language model APIs
* Web Speech API for voice features
* Mental health professionals whose best practices inspired the system prompt

---
