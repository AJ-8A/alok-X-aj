const timeElement = document.getElementById("currentTime");
const dateElement = document.getElementById("currentDate");
const messageElement = document.getElementById("message");
const themeToggle = document.getElementById("themeToggle");
const navActions = document.querySelector(".nav-actions");

function showTime() {
  const now = new Date();

  timeElement.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  dateElement.textContent = now.toLocaleDateString([], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function showMessage() {
  messageElement.textContent = "You’ve got this. Make today meaningful ✨";
}

function updateThemeIcon() {
  themeToggle.textContent = document.documentElement.classList.contains("light")
    ? "☀"
    : "☾";
}

themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("light");

  localStorage.setItem(
    "techLabTheme",
    document.documentElement.classList.contains("light")
      ? "light"
      : "dark"
  );

  updateThemeIcon();
});

if (localStorage.getItem("techLabTheme") === "light") {
  document.documentElement.classList.add("light");
}

updateThemeIcon();

const menuButton = document.createElement("button");
menuButton.className = "menu-toggle";
menuButton.type = "button";
menuButton.setAttribute("aria-label", "Open navigation menu");
menuButton.setAttribute("aria-expanded", "false");
menuButton.innerHTML = "<span></span><span></span><span></span>";

navActions.prepend(menuButton);

const calculatorLink = document.createElement("a");
calculatorLink.href = "calculator.html";
calculatorLink.className = "nav-link";
calculatorLink.textContent = "Calculator";
navActions.insertBefore(calculatorLink, themeToggle);

menuButton.addEventListener("click", () => {
  const isOpen = navActions.classList.toggle("menu-open");

  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navActions.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
  });
});

const projectGrid = document.querySelector(".project-grid");

if (projectGrid) {
  const calculatorCard = document.createElement("article");
  calculatorCard.className = "project-card";
  calculatorCard.innerHTML = `
    <div class="project-icon">🧮</div>
    <span class="project-label">PRODUCTIVITY TOOL</span>
    <h3>Calculator</h3>
    <p>
      Perform quick calculations with a clean, responsive calculator built by
      Tech-Lab.
    </p>
    <div class="project-actions">
      <a class="project-button" href="calculator.html">Open Calculator →</a>
    </div>
  `;

  projectGrid.appendChild(calculatorCard);
}

const menuStyles = document.createElement("style");
menuStyles.textContent = `
  .menu-toggle {
    display: none;
    width: 40px;
    height: 38px;
    padding: 8px;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--surface);
    cursor: pointer;
  }

  .menu-toggle span {
    display: block;
    width: 22px;
    height: 2px;
    margin: 4px auto;
    background: var(--text);
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  @media (max-width: 600px) {
    .menu-toggle {
      display: block;
    }

    .nav-actions {
      position: relative;
      gap: 10px;
    }

    .nav-actions .nav-link {
      display: none;
    }

    .nav-actions.menu-open {
      padding-bottom: 10px;
    }

    .nav-actions.menu-open .nav-link {
      display: block;
      position: absolute;
      right: 48px;
      width: 150px;
      padding: 10px 14px;
      border: 1px solid var(--border);
      background: var(--surface-solid);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
    }

    .nav-actions.menu-open .nav-link:nth-of-type(1) {
      top: 48px;
    }

    .nav-actions.menu-open .nav-link:nth-of-type(2) {
      top: 88px;
    }

    .nav-actions.menu-open .nav-link:nth-of-type(3) {
      top: 128px;
    }

    .nav-actions.menu-open .nav-link:nth-of-type(4) {
      top: 168px;
    }

    .nav-actions.menu-open .menu-toggle span:nth-child(1) {
      transform: translateY(6px) rotate(45deg);
    }

    .nav-actions.menu-open .menu-toggle span:nth-child(2) {
      opacity: 0;
    }

    .nav-actions.menu-open .menu-toggle span:nth-child(3) {
      transform: translateY(-6px) rotate(-45deg);
    }
  }
`;

document.head.appendChild(menuStyles);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

document.querySelectorAll("[data-count]").forEach((counter) => {
  const target = Number(counter.dataset.count);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 45));

  const countUp = () => {
    current += step;
    counter.textContent = Math.min(current, target);

    if (current < target) {
      requestAnimationFrame(countUp);
    }
  };

  countUp();
});

showTime();
showMessage();
setInterval(showTime, 1000);
