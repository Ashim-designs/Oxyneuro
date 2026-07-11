/* ==========================================
   OxyNeuro AI
   JavaScript
========================================== */

const input = document.getElementById("prompt");
const send = document.getElementById("send");
const messages = document.getElementById("messages");

// Send Message
async function sendMessage() {

    const text = input.value.trim();

    if (!text) return;

    // Hide welcome screen
    const welcome = document.querySelector(".welcome");
    if (welcome) welcome.style.display = "none";

    // User message
    messages.innerHTML += `
        <div class="message">
            <div class="avatar">😊</div>
            <div class="bubble">${text}</div>
        </div>
    `;

    input.value = "";
    messages.scrollTop = messages.scrollHeight;

    // Typing indicator
    messages.innerHTML += `
        <div class="message" id="typing">
            <div class="avatar">🧠</div>
            <div class="bubble">Typing...</div>
        </div>
    `;

    messages.scrollTop = messages.scrollHeight;

    try {

        const response = await fetch("https://oxyneuro.vercel.app/api/chat",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text
            })
        });

        const data = await response.json();

        const typing = document.getElementById("typing");
        if (typing) typing.remove();

        messages.innerHTML += `
            <div class="message">
                <div class="avatar">🧠</div>
                <div class="bubble">${data.reply}</div>
            </div>
        `;

    } catch (error) {

        const typing = document.getElementById("typing");
        if (typing) typing.remove();

        messages.innerHTML += `
            <div class="message">
                <div class="avatar">🧠</div>
                <div class="bubble">
                    ❌ Failed to connect to AI.
                </div>
            </div>
        `;

        console.error(error);
    }

    messages.scrollTop = messages.scrollHeight;
}

// Send button
if (send) {
    send.addEventListener("click", sendMessage);
}

// Enter key
if (input) {
    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    });
}

// Sidebar
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");
const overlay = document.getElementById("overlay");

if (menuBtn && sidebar && overlay) {

    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("show");
        overlay.classList.toggle("show");
    });

    overlay.addEventListener("click", () => {
        sidebar.classList.remove("show");
        overlay.classList.remove("show");
    });

}
