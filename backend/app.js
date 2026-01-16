import express from "express";
import { generate } from "./vatalap.js";
import cors from "cors";


const app = express();
app.use(express.json());

// CORS configuration
const corsOptions = {
    origin: [
        'https://vatalap-ai-bot.vercel.app',
        'https://vatalap-ai-chat.vercel.app',
        'http://localhost:3000',
        'http://localhost:8000',
        'http://127.0.0.1:5500',
        /\.vercel\.app$/
    ],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.get("/", (req, res) => {
    res.send("Welcome to Vartalap");
});
app.get("/chat",(req,res)=>{
    res.send("Welcome to Chat");
})
app.post("/chat", async (req, res) => {
    try {
        const { message ,threadId} = req.body;

        const result = await generate(message,threadId);

        res.json({ message: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// Export for Vercel serverless
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
    const port = 5050;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
