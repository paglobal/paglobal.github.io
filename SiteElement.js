var html = (strings, ...values) => {
  return strings
    .map((string, i) => string + (values?.[i] ? values?.[i] : ""))
    .join("");
};
var css = html;

class SiteElement extends HTMLElement {
  constructor() {
    super();

    this.themeMode = "light";
    this.navModalState = "closed";
    this.light = {
      primaryFill: "white",
      primaryStroke: "black",
      primaryAccent: "#347DA7",
    };
    this.dark = {
      primaryFill: "black",
      primaryStroke: "white",
      primaryAccent: "#55BFF6",
    };
  }

  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });
    this.styleSheet = new CSSStyleSheet();
    this.shadow.adoptedStyleSheets = [this.styleSheet];
    this.updateState("themeMode", localStorage.getItem("studioThemeMode"));
  }

  render() {
    this.shadow.innerHTML = this.renderHTML();
    this.styleSheet.replaceSync(this.renderStyleSheet());
  }
}
