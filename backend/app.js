import express from "express";
import { generate } from "./vatalap.js";
import cors from "cors";


const app = express();

// CORS middleware - MUST be before express.json() and all routes
app.use((req, res, next) => {
    const origin = req.headers.origin;
    
    // Set CORS headers
    res.header('Access-Control-Allow-Origin', origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '86400'); // 24 hours
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    
    next();
});

app.use(express.json());

// CORS configuration - Allow all origins (backup)
const corsOptions = {
    origin: true, // Allow all origins
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Length', 'Content-Type'],
    optionsSuccessStatus: 200
};

// Apply CORS to all routes (backup)
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("Welcome to Vartalap");
});
app.get("/chat",(req,res)=>{
    res.send("Welcome to Chat");
})
app.post("/chat", async (req, res) => {
    // Set CORS headers manually as backup
    const origin = req.headers.origin;
    if (origin) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', 'true');
    }
    
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
