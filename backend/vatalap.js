import Groq from "groq-sdk";
import { tavily } from "@tavily/core"
import NodeCache from "node-cache";

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY || "" });
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

const Cache = new NodeCache({stdTTL:60*60*24});

const Max_try=10;
let count=0
/**
 * Tool: Web Search (Tavily)
 */
async function webSearch({ query }) {
  console.log("🔍 Calling web search...");

  const response = await tvly.search(query);

  const finalResult = response.results
    .map((result) => result.content)
    .join("\n\n");

  return finalResult;
}

export async function generate(Usermessage,threadId) {

  if(count>Max_try)
  {
    return "ANS NOT FOUND";
  }
  count++;
  const basemessages = [
    {
      role: "system",
      content: `
You are a smart personal assistant who answers the asked questions.

You have access to the following tool:

1. webSearch({ query: string })
   - Search the latest information and realtime data on the internet.
      `
    }
  ];

  const messages=Cache.get(threadId) ?? basemessages;

    messages.push({
      role:'user',
      content:Usermessage,
    })



    while (true) {
    const completions = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      messages,
      tools: [
        {
          type: "function",
          function: {
            name: "webSearch",
            description:
              "Search the latest information and realtime data on the internet.",
            parameters: {
              type: "object",
              properties: {
                query: {
                  type: "string",
                  description: "The search query to perform",
                },
              },
              required: ["query"],
            },
          },
        },
      ],
      tool_choice: "auto",
    });

    const message = completions.choices[0].message;
    messages.push(message);

    const toolCalls = message.tool_calls;

    // ✅ If no tool call → final answer
    if (!toolCalls) {
      Cache.set(threadId,messages)
      return message.content;
      
    }

    // ✅ Execute tools
    for (const tool of toolCalls) {
      const functionName = tool.function.name;
      const functionParams = JSON.parse(tool.function.arguments);

      if (functionName === "webSearch") {
        const toolResult = await webSearch(functionParams);

        messages.push({
          tool_call_id: tool.id,
          role: "tool",
          name: functionName,
          content: toolResult,
        });
      }
    }
  }
 
}
