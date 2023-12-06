class MySite extends SiteElement {
  constructor() {
    super();

    this.themeMode = "light";
    this.navModalState = "closed";
  }

  closeIcon() {
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill=${this[this.themeMode].primaryStroke}
        d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275L12 13.4Z"
      />
    </svg>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateState("themeMode", localStorage.getItem("studioThemeMode"));
  }

  hamburgerIcon() {
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill=${this[this.themeMode].primaryStroke}
        d="M3 18v-2h18v2H3Zm0-5v-2h18v2H3Zm0-5V6h18v2H3Z"
      />
    </svg>`;
  }

  moonIcon() {
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill=${this[this.themeMode].primaryStroke}
        d="M12 21q-3.775 0-6.387-2.613T3 12q0-3.45 2.25-5.988T11 3.05q.325-.05.575.088t.4.362q.15.225.163.525t-.188.575q-.425.65-.638 1.375T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q.775 0 1.538-.225t1.362-.625q.275-.175.563-.162t.512.137q.25.125.388.375t.087.6q-.35 3.45-2.937 5.725T12 21Zm0-2q2.2 0 3.95-1.213t2.55-3.162q-.5.125-1 .2t-1 .075q-3.075 0-5.238-2.163T9.1 7.5q0-.5.075-1t.2-1q-1.95.8-3.163 2.55T5 12q0 2.9 2.05 4.95T12 19Zm-.25-6.75Z"
      />
    </svg>`;
  }

  render() {
    super.render();
    document.body.style = css`
      background: ${this[this.themeMode].primaryFill};
    `;
  }

  renderHTML() {
    setTimeout(() => {
      this.shadow.querySelector(".nav-themeMode-toggle").onclick = () => {
        this.updateState(
          "themeMode",
          this.themeMode === "dark" ? "light" : "dark",
        );
        localStorage.setItem("studioThemeMode", this.themeMode);
      };

      this.shadow.querySelector(".nav-modal-toggle").onclick = () => {
        this.updateState(
          "navModalState",
          this.navModalState === "open" ? "closed" : "open",
        );
      };

      // doing this because I'm currently unable to set `navModalEntry` font color in `renderStyleSheet`
      this.shadow
        .querySelectorAll(".nav-modal-entry")
        .forEach((navModalEntry) => {
          navModalEntry.style = css`
            color: ${this[this.themeMode].primaryAccent};
          `;
        });

      document.querySelectorAll("*").forEach((element) => {
        element.style = css`
          color: ${this[this.themeMode].primaryStroke};
        `;
      });

      document.body.style = css`
        background: ${this[this.themeMode].primaryFill};
      `;
    });

    return html`<div class="container">
      <div class="nav">
        <a href="/" class="nav-main-container">
          <img class="nav-image" src="/assets/me.jpg" />
          <p class="nav-title">Paul Amoah</p>
        </a>
        <div class="nav-icons">
          <span class="nav-icon nav-themeMode-toggle">
            ${this.themeMode === "light" ? this.sunIcon() : this.moonIcon()}
          </span>
          <span class="nav-icon nav-modal-toggle">
            ${
              this.navModalState === "closed"
                ? this.hamburgerIcon()
                : this.closeIcon()
            }
          </span>
        </div>
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
      </div>
      <div class="content"><slot><slot></div>
    </div>`;
  }

  renderStyleSheet() {
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

      .container {
        background: ${this[this.themeMode].primaryFill};
        width: 100vw;
        height: max-content;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 3rem 0;
      }

      .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: min(600px, 90vw);
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
        color: ${this[this.themeMode].primaryStroke};
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
        outline: 2px solid ${this[this.themeMode].primaryAccent};
      }

      .nav-icons svg {
        width: 1.75rem;
      }

      .nav-modal {
        display: ${this.navModalState === "open" ? "flex" : "none"};
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1.5rem;
        position: absolute;
        top: calc(9rem);
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 99;
        border: 2px solid ${this[this.themeMode].primaryAccent};
        border-radius: 0.5rem;
        padding: 2rem;
        width: min(400px, 70vw);
        background: ${this[this.themeMode].primaryFill};
      }

      .nav-modal-entry {
        font-size: 1rem;
        text-decoration: none;
      }

      .content {
        width: min(700px, 80vw);
        height: max-content;
        display: flex;
        align-items: center;
        margin-top: 6rem;
        justify-content: center;
      }

      .content ::slotted(*)) {
        color: ${this[this.themeMode].primaryStroke} !important;
      }
    `;
  }

  sunIcon() {
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill=${this[this.themeMode].primaryStroke}
        d="M12 15q1.25 0 2.125-.875T15 12q0-1.25-.875-2.125T12 9q-1.25 0-2.125.875T9 12q0 1.25.875 2.125T12 15Zm0 2q-2.075 0-3.537-1.463T7 12q0-2.075 1.463-3.537T12 7q2.075 0 3.538 1.463T17 12q0 2.075-1.463 3.538T12 17ZM2 13q-.425 0-.712-.288T1 12q0-.425.288-.712T2 11h2q.425 0 .713.288T5 12q0 .425-.288.713T4 13H2Zm18 0q-.425 0-.712-.288T19 12q0-.425.288-.712T20 11h2q.425 0 .713.288T23 12q0 .425-.288.713T22 13h-2Zm-8-8q-.425 0-.712-.288T11 4V2q0-.425.288-.712T12 1q.425 0 .713.288T13 2v2q0 .425-.288.713T12 5Zm0 18q-.425 0-.712-.288T11 22v-2q0-.425.288-.712T12 19q.425 0 .713.288T13 20v2q0 .425-.288.713T12 23ZM5.65 7.05L4.575 6q-.3-.275-.288-.7t.288-.725q.3-.3.725-.3t.7.3L7.05 5.65q.275.3.275.7t-.275.7q-.275.3-.687.288T5.65 7.05ZM18 19.425l-1.05-1.075q-.275-.3-.275-.712t.275-.688q.275-.3.688-.287t.712.287L19.425 18q.3.275.288.7t-.288.725q-.3.3-.725.3t-.7-.3ZM16.95 7.05q-.3-.275-.288-.687t.288-.713L18 4.575q.275-.3.7-.288t.725.288q.3.3.3.725t-.3.7L18.35 7.05q-.3.275-.7.275t-.7-.275ZM4.575 19.425q-.3-.3-.3-.725t.3-.7l1.075-1.05q.3-.275.712-.275t.688.275q.3.275.288.688t-.288.712L6 19.425q-.275.3-.7.288t-.725-.288ZM12 12Z"
      />
    </svg>`;
  }
}

customElements.define("my-site", MySite);
