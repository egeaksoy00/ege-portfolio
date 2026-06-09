const buttons = document.querySelectorAll("[data-window]");
const windows = document.querySelectorAll(".window");

function openWindow(id) {
  windows.forEach((windowEl) => {
    windowEl.classList.toggle("active", windowEl.id === id);
  });

  buttons.forEach((button) => {
    button.classList.toggle("active", button.dataset.window === id);
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    openWindow(button.dataset.window);
  });
});

function updateClock() {
  const clock = document.getElementById("clock");
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

updateClock();
setInterval(updateClock, 1000);

// Forward basic mouse/key events to parent iframe host when used inside the 3D monitor.
["mousemove", "mousedown", "mouseup", "keydown", "keyup"].forEach((type) => {
  window.addEventListener(type, (event) => {
    if (window.parent) {
      window.parent.postMessage(
        {
          type,
          clientX: event.clientX,
          clientY: event.clientY,
          key: event.key,
        },
        "*"
      );
    }
  });
});

const desktop = document.querySelector(".desktop");

function showWelcome() {
  if (!desktop) return;

  desktop.innerHTML = `
    <section class="welcome-screen">
      <div class="welcome-card">
        <p class="welcome-kicker">EgeOS boot sequence interrupted</p>
        <h1>Welcome, visitor.</h1>
        <p>
          You found the close button. Nice.
          This is Ege Aksoy’s tiny operating system for projects,
          experiments, crypto signals, automation, and unfinished ideas that might become something serious.
        </p>

        <button class="enter-os-button" id="enterEgeOS">
          Enter EgeOS
        </button>
      </div>
    </section>
  `;

  const enterButton = document.getElementById("enterEgeOS");

  enterButton.addEventListener("click", () => {
    window.location.reload();
  });
}

const closeButton = document.querySelector(".traffic span:first-child");

if (closeButton) {
  closeButton.style.cursor = "pointer";
  closeButton.addEventListener("click", showWelcome);
}