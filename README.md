# Vartalap AI Chatbot

Vartalap is a real-time AI-powered chat application built with modern web technologies. The frontend provides a clean, responsive chat interface, while the backend handles user messages and generates intelligent responses using Groq AI and Tavily web search.

## 🚀 Features

- **AI-Powered Conversations**: Chat with an intelligent assistant powered by Groq's Llama 3.3 70B model
- **Real-time Web Search**: Get up-to-date information using Tavily search integration
- **Thread-based Conversations**: Maintains conversation context using thread IDs
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS
- **Serverless Deployment**: Ready for Vercel deployment

## 📁 Project Structure

```
groq_api_calling/
├── backend/          # Express.js API server
│   ├── app.js        # Main Express application
│   ├── vatalap.js    # AI generation logic with Groq & Tavily
│   └── package.json  # Backend dependencies
├── frontend/         # Static frontend files
│   ├── index.html    # Main HTML file
│   └── script.js     # Frontend JavaScript
├── vercel.json       # Vercel deployment configuration
└── .gitignore        # Git ignore rules
```

## 🛠️ Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Groq API key
- Tavily API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bhattdeepanshu49/Vatalap.ai--chatbot.git
cd Vatalap.ai--chatbot
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the `backend` folder
   - Add your API keys:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   TAVILY_API_KEY=your_tavily_api_key_here
   ```

### Local Development

1. Start the backend server:
```bash
cd backend
npm run dev
```

The server will run on `http://localhost:5050`

2. Open `frontend/index.html` in your browser or use a local server:
```bash
# Using Python
cd frontend
python -m http.server 8000

# Using Node.js http-server
npx http-server frontend -p 8000
```

## 🚀 Deployment to Vercel

1. **Install Vercel CLI** (if not already installed):
```bash
npm i -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel
```

4. **Set Environment Variables in Vercel Dashboard**:
   - Go to your project settings on Vercel
   - Navigate to "Environment Variables"
   - Add:
     - `GROQ_API_KEY` = your Groq API key
     - `TAVILY_API_KEY` = your Tavily API key

5. **For production deployment**:
```bash
vercel --prod
```

### Alternative: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import this GitHub repository
4. Add environment variables in project settings
5. Click "Deploy"

## 📝 API Endpoints

- `GET /api/` - Welcome message
- `GET /api/chat` - Chat endpoint info
- `POST /api/chat` - Send a message and get AI response
  ```json
  {
    "message": "Your question here",
    "threadId": "unique_thread_id"
  }
  ```

## 🔧 Technologies Used

- **Frontend**: HTML, Tailwind CSS, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **AI**: Groq SDK (Llama 3.3 70B)
- **Web Search**: Tavily API
- **Deployment**: Vercel
- **Caching**: node-cache

## 📄 License

ISC

## 🔗 Links

- **Live Demo**: [vatalap-ai-chat.vercel.app](https://vatalap-ai-chat.vercel.app)
- **Repository**: [GitHub](https://github.com/bhattdeepanshu49/Vatalap.ai--chatbot)

