const html = (strings, ...values) => {
  return strings
    .map((string, i) => string + (values?.[i] ? values?.[i] : ""))
    .join("");
};
const css = html;

const state = {
  themeMode:
    localStorage.getItem("studioThemeMode") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"),
  navModalState: "closed",
};

const components = {
  closeIcon() {
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275L12 13.4Z"
      />
    </svg>`;
  },
  hamburgerIcon() {
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M3 18v-2h18v2H3Zm0-5v-2h18v2H3Zm0-5V6h18v2H3Z"
      />
    </svg>`;
  },
  moonIcon() {
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 21q-3.775 0-6.387-2.613T3 12q0-3.45 2.25-5.988T11 3.05q.325-.05.575.088t.4.362q.15.225.163.525t-.188.575q-.425.65-.638 1.375T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q.775 0 1.538-.225t1.362-.625q.275-.175.563-.162t.512.137q.25.125.388.375t.087.6q-.35 3.45-2.937 5.725T12 21Zm0-2q2.2 0 3.95-1.213t2.55-3.162q-.5.125-1 .2t-1 .075q-3.075 0-5.238-2.163T9.1 7.5q0-.5.075-1t.2-1q-1.95.8-3.163 2.55T5 12q0 2.9 2.05 4.95T12 19Zm-.25-6.75Z"
      />
    </svg>`;
  },
  sunIcon() {
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 15q1.25 0 2.125-.875T15 12q0-1.25-.875-2.125T12 9q-1.25 0-2.125.875T9 12q0 1.25.875 2.125T12 15Zm0 2q-2.075 0-3.537-1.463T7 12q0-2.075 1.463-3.537T12 7q2.075 0 3.538 1.463T17 12q0 2.075-1.463 3.538T12 17ZM2 13q-.425 0-.712-.288T1 12q0-.425.288-.712T2 11h2q.425 0 .713.288T5 12q0 .425-.288.713T4 13H2Zm18 0q-.425 0-.712-.288T19 12q0-.425.288-.712T20 11h2q.425 0 .713.288T23 12q0 .425-.288.713T22 13h-2Zm-8-8q-.425 0-.712-.288T11 4V2q0-.425.288-.712T12 1q.425 0 .713.288T13 2v2q0 .425-.288.713T12 5Zm0 18q-.425 0-.712-.288T11 22v-2q0-.425.288-.712T12 19q.425 0 .713.288T13 20v2q0 .425-.288.713T12 23ZM5.65 7.05L4.575 6q-.3-.275-.288-.7t.288-.725q.3-.3.725-.3t.7.3L7.05 5.65q.275.3.275.7t-.275.7q-.275.3-.687.288T5.65 7.05ZM18 19.425l-1.05-1.075q-.275-.3-.275-.712t.275-.688q.275-.3.688-.287t.712.287L19.425 18q.3.275.288.7t-.288.725q-.3.3-.725.3t-.7-.3ZM16.95 7.05q-.3-.275-.288-.687t.288-.713L18 4.575q.275-.3.7-.288t.725.288q.3.3.3.725t-.3.7L18.35 7.05q-.3.275-.7.275t-.7-.275ZM4.575 19.425q-.3-.3-.3-.725t.3-.7l1.075-1.05q.3-.275.712-.275t.688.275q.3.275.288.688t-.288.712L6 19.425q-.275.3-.7.288t-.725-.288ZM12 12Z"
      />
    </svg>`;
  },
  navModal() {
    return html`
      <div class="nav-modal">
        <a href="/" class="nav-modal-entry">Home</a>
        <a href="/pages/projects/index.html" class="nav-modal-entry"
          >Projects</a
        >
        <a href="/pages/research/index.html" class="nav-modal-entry"
          >Research</a
        >
        <a href="/pages/posts/index.html" class="nav-modal-entry">Posts</a>
      </div>
    `;
  },
  navSection() {
    return html`
      <div class="nav">
        <a href="/" class="nav-main-container">
          <img class="nav-image" src="/assets/photos/me.jpg" />
          <p class="nav-title">Paul Amoah</p>
        </a>
        <div class="nav-icons">
          <span class="nav-icon nav-themeMode-toggle">
            ${state.themeMode === "dark"
              ? components.sunIcon()
              : components.moonIcon()}
          </span>
          <span class="nav-icon nav-modal-toggle">
            ${state.navModalState === "closed"
              ? components.hamburgerIcon()
              : components.closeIcon()}
          </span>
        </div>
        ${components.navModal()}
      </div>
    `;
  },
};

function init() {
  if (state.themeMode === "dark") {
    document.body.classList.add("dark");
    document.documentElement.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
    document.documentElement.classList.remove("dark");
  }
  const link = document.createElement("link");
  link.className = "code";
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", `code-${state.themeMode}.css`);
  document.head.appendChild(link);
  render();
}

function render() {
  document.querySelector(".shell-style-sheet").innerHTML =
    renderShellStyleSheet();
  document.querySelector(".shell-html").innerHTML = renderShellHTML();
}

function renderShellHTML() {
  // use `setTimeout` to ensure that elements exist when we try to grab them
  setTimeout(() => {
    document
      .querySelector("link.code")
      .setAttribute("href", `code-${state.themeMode}.css`);

    document
      .querySelector(".content")
      .appendChild(document.querySelector("template").content.cloneNode(true));

    document.querySelector(".nav-themeMode-toggle").onclick = () => {
      if (document.body.classList.contains("dark")) {
        document.body.classList.remove("dark");
        document.documentElement.classList.remove("dark");
        updateState("themeMode", "light");
        localStorage.setItem("studioThemeMode", "light");
      } else {
        document.body.classList.add("dark");
        document.documentElement.classList.add("dark");
        updateState("themeMode", "dark");
        localStorage.setItem("studioThemeMode", "dark");
      }
    };

    document.querySelector(".nav-modal-toggle").onclick = () => {
      updateState(
        "navModalState",
        state.navModalState === "open" ? "closed" : "open",
      );
    };

    // necessary because template styles in `base.html` for code blocks get overwritten by styles in `code-${state.themeMode}.css`
    document.querySelectorAll("code").forEach((codeBlock) => {
      codeBlock.style = css`
        background: var(--primary-fill);
      `;
    });
  });

  return html`
    ${components.navSection()}
    <div class="content"></div>
    <div class="copyright">
      Copyright © ${new Date().getFullYear()} Paul Amoah
    </div>
  `;
}

function renderShellStyleSheet() {
  return css`
    a:focus,
    button:focus {
      outline: none !important;
    }

    a,
    button {
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: min(800px, 85vw);
    }

    .nav-main-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1.5rem;
      text-decoration: none;
    }

    .nav-image {
      width: 4.5rem;
      border-radius: 50%;
    }

    .nav-title {
      font-size: 1.25em;
      font-weight: bold;
      color: var(--secondary-stroke);
    }

    .nav-icons {
      display: flex;
      gap: 0.5rem;
    }

    .nav-icon {
      cursor: pointer;
      padding: 0.3rem 0.3rem 0 0.3rem;
      border-radius: 0.2rem;
    }

    .nav-icon:hover {
      outline: 2px solid var(--primary-accent);
    }

    .nav-icons svg {
      width: 1.75rem;
    }

    .nav-modal {
      display: ${state.navModalState === "open" ? "flex" : "none"};
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1.5rem;
      position: absolute;
      top: 10rem;
      left: 50%;
      transform: translate(-50%, 0);
      z-index: 99;
      border: 2px solid var(--primary-accent);
      border-radius: 0.5rem;
      padding: 2rem;
      width: min(700px, 70vw);
      background: var(--primary-fill);
    }

    .nav-modal-entry {
      font-size: 1rem;
      text-decoration: none;
      color: var(--primary-accent);
    }

    .content {
      width: min(800px, 85vw);
      height: max-content;
      display: flex;
      align-items: center;
      margin: 0;
      justify-content: center;
      flex-direction: column;
      overflow-x: auto;
      padding-top: 3rem;
      padding-bottom: 7rem;
    }

    .template-content {
      display: block;
      overflow-x: auto;
      width: 100%;
      overflow-wrap: break-word;
      hyphens: manual;
      margin: 0;
    }

    .copyright {
      color: var(--tertiary-stroke);
      font-size: 0.75rem;
      position: absolute;
      bottom: 0;
      margin: 0;
      padding: 2rem;
    }
  `;
}

function updateState(stateName, newState) {
  state[stateName] =
    newState !== undefined && newState !== null ? newState : state[stateName];
  render();
}

init();
