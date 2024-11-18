function sendMessage() {
    const chatWindow = document.getElementById("chat-window");
    const chatInput = document.getElementById("chat-input");
    let messageText = chatInput.value.trim();

    if (messageText === "//clear") {
        chatWindow.innerHTML = "";
        chatInput.value = "";
        //make massege of thechat was clear
        return;
    }

    const timerMatch = messageText.match(/(\d+)\/$/);
    let timeoutDuration = 0;
    if (timerMatch) {
        timeoutDuration = parseInt(timerMatch[1], 10) * 1000;
        messageText = messageText.replace(/(\d+)\/$/, "").trim();
    } else {
        const messageLength = messageText.length;
        timeoutDuration = Math.max(1, messageLength) * 3 * 1000;
    }

    if (messageText !== "") {
        const userMessage = document.createElement("div");
        userMessage.classList.add("chat-message", "user");
        userMessage.textContent = messageText;

        const timerElement = document.createElement("div");
        timerElement.classList.add("timer");
        timerElement.textContent = `${timeoutDuration / 1000} sec`;
        userMessage.appendChild(timerElement);

        chatWindow.appendChild(userMessage);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        chatInput.value = "";

        let countdown = timeoutDuration / 1000;
        const countdownInterval = setInterval(() => {
            if (countdown > 0) {
                if (countdown >= 3600) {
                    const hours = Math.floor(countdown / 3600);
                    const minutes = Math.floor((countdown % 3600) / 60);
                    const seconds = countdown % 60;
                    timerElement.textContent = `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} min ${seconds} sec`;
                } else if (countdown >= 60) {
                    const minutes = Math.floor(countdown / 60);
                    const seconds = countdown % 60;
                    timerElement.textContent = `${minutes === 60 ? 1 : minutes} hour${minutes === 60 ? '' : ''} ${seconds} sec`;
                } else {
                    timerElement.textContent = `${countdown} sec`;
                }
                countdown--;
            } else {
                clearInterval(countdownInterval);
                userMessage.style.transition = "opacity 0.5s ease-out";
                userMessage.style.opacity = "0";
                setTimeout(() => userMessage.remove(), 500);
            }
        }, 1000);

        setTimeout(() => {
            clearInterval(countdownInterval);
            userMessage.style.transition = "opacity 0.5s ease-out";
            userMessage.style.opacity = "0";
            setTimeout(() => userMessage.remove(), 500);
        }, timeoutDuration);
    }
}


  // Matrix Rain Animation
  window.onload = function() {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.id = 'matrix-canvas';
    const ctx = canvas.getContext('2d');
    
    // Make the canvas fill the screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Characters to use in the matrix rain
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=~';
    const font_size = 16;
    const columns = canvas.width / font_size;  // Number of columns for the rain
    const drops = new Array(Math.floor(columns)).fill(1);

    // Function to draw the matrix rain
    function drawMatrixRain() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // transparent black background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#88c0d0'; // Change this line to set the text color to #88c0d0 (cyan)
      ctx.font = `${font_size}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * font_size, drops[i] * font_size);
        
        if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
    }

    // Keep the animation going
    setInterval(drawMatrixRain, 50); // Speed is controlled by this line
  };



function checkEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
}

const sendButton = document.querySelector(".send-btn");
sendButton.addEventListener("click", sendMessage);

const chatInput = document.getElementById("chat-input");
chatInput.addEventListener("keydown", checkEnter);
