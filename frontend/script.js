console.log("welcome to vartalap");

const input = document.querySelector('#input');
const chatContainer = document.querySelector('#chatContainer');
const askBtn = document.querySelector('#askBtn');

const threadId= Date.now().toString(36)+ Math.random().toString(36).substring(2,8);

input?.addEventListener('keyup', handleEnter);
askBtn?.addEventListener('click', handleAsk);

const thinking = document.createElement('div')
thinking.className= 'my-6 animate-pulse'
thinking.textContent="Thinking..."

async function generate(text) {
    // User message
    const userMsg = document.createElement('div');
    userMsg.className = 'my-6 bg-neutral-700 p-3 rounded-xl ml-auto max-w-fit';
    userMsg.textContent = text;
    chatContainer.appendChild(userMsg);
    chatContainer.appendChild(thinking);
    input.value = "";

    // Call server with TEXT (not DOM)
    const reply = await callServer(text);

    // AI message
    const botMsg = document.createElement('div');
    botMsg.className = 'my-6 bg-neutral-800 p-3 rounded-xl mr-auto max-w-fit';
    botMsg.textContent = reply;
    thinking.remove();
    chatContainer.appendChild(botMsg);
}

async function callServer(text) {
    // Use relative path for production, fallback to localhost for development
    const apiUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:5050/chat' 
        : '/api/chat';
    
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text,threadId }),
    });

    if (!response.ok) {
        throw new Error('Error generating the response.');
    }

    const result = await response.json();
    return result.message;
}

async function handleAsk() {
    const text = input?.value.trim();
    if (!text) return;

    await generate(text);
}

async function handleEnter(e) {
    if (e.key === 'Enter') {
        const text = input?.value.trim();
        if (!text) return;

        await generate(text);
    }
}
