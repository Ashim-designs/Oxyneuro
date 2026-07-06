/* ==========================
   OxyNeuro AI - JavaScript
   Part 1
========================== */

// Elements
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const messages = document.getElementById("messages");

// Toggle sidebar
menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

// Send message
function sendMessage() {

    const text = messageInput.value.trim();

    if (text === "") return;

    // Create user message
    const userMessage = document.createElement("div");
    userMessage.className = "message";

    userMessage.innerHTML = `
        <div class="avatar">😊</div>
        <div class="bubble">${text}</div>
    `;

    messages.appendChild(userMessage);

    // Clear input
    messageInput.value = "";

    // Auto scroll
    messages.scrollTop = messages.scrollHeight;

    // Fake typing...
    setTimeout(() => {

        const aiMessage = document.createElement("div");

        aiMessage.className = "message ai";

        aiMessage.innerHTML = `
            <div class="avatar">🧠</div>
            <div class="bubble">
                I'm still under development 🚀<br><br>
                Soon I'll be connected to a real AI model.
            </div>
        `;

        messages.appendChild(aiMessage);

        messages.scrollTop = messages.scrollHeight;

    },1000);

}

// Button click
sendBtn.addEventListener("click",sendMessage);

// Press Enter
messageInput.addEventListener("keypress",function(e){

    if(e.key==="Enter"){
        sendMessage();
    }

});
