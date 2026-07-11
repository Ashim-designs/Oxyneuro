/* ==========================================
   OxyNeuro AI
   JavaScript - Part 1
========================================== */

const input = document.getElementById("prompt");
const send = document.getElementById("send");
const messages = document.getElementById("messages");

async function sendMessage() {

    const text = input.value.trim();

    if (!text) return;

    const welcome = document.querySelector(".welcome");
    if (welcome) welcome.style.display = "none";

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

        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text
            })
        });

        const data = await response.json();

        document.getElementById("typing").remove();

        messages.innerHTML += `
            <div class="message">
                <div class="avatar">🧠</div>
                <div class="bubble">${data.reply}</div>
            </div>
        `;

    } catch (error) {

        document.getElementById("typing").remove();

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

// Send a message
function sendMessage() {

    const text = input.value.trim();

    if (!text) return;

    // Remove welcome screen on first message
    const welcome = document.querySelector(".welcome");
    if (welcome) {
        welcome.style.display = "none";
    }

    
// Send button
send.addEventListener("click", sendMessage);

// Enter key
input.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        e.preventDefault();

        sendMessage();

    }

});

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");
const overlay = document.getElementById("overlay");

    messages.scrollTop = messages.scrollHeight;

           }
   
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
