/* ==========================================
   OxyNeuro AI
   JavaScript - Part 1
========================================== */

const input = document.getElementById("prompt");
const send = document.getElementById("send");
const messages = document.getElementById("messages");

// Send a message
function sendMessage() {

    const text = input.value.trim();

    if (!text) return;

    // Remove welcome screen on first message
    const welcome = document.querySelector(".welcome");
    if (welcome) {
        welcome.style.display = "none";
    }

    // User message
    messages.innerHTML += `
        <div class="message">
            <div class="avatar">😊</div>
            <div class="bubble">${text}</div>
        </div>
    `;

    input.value = "";

    messages.scrollTop = messages.scrollHeight;

    // AI typing
    setTimeout(() => {

        messages.innerHTML += `
            <div class="message">
                <div class="avatar">🧠</div>
                <div class="bubble">
                    🚀 OxyNeuro AI isn't connected yet.<br><br>
                    Soon this will respond using a real AI model.
                </div>
            </div>
        `;

        messages.scrollTop = messages.scrollHeight;

    }, 1000);

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

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("show");
    overlay.classList.toggle("show");
});

overlay.addEventListener("click", () => {
    sidebar.classList.remove("show");
    overlay.classList.remove("show");
});
