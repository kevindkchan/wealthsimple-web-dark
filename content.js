console.log("Wealthsimple Dark Mode browser extension successfully loaded.");

const colorSwaps = {
  "#93290b": "#f98b73",
  "#3e5e17": "#a9b883",
  "#32302f": "#f1f1f1",
  "#615e5c": "#a4a2a0"
};

const backgroundColorSwaps = {
  "#ffffff": "#181715",
  "#fcfcfc": "#181715",
  "#f1f1f1": "#181715",
  "#32302f": "#f1f1f1",
  "#93290b": "#f98b73",
  "#3e5e17": "#a9b883"
};

const backgroundSwaps = {
  "#ffffff": "#181715",
  "#fcfcfc": "#181715",
  "#f1f1f1": "#181715",
};

// Converts rgb to hex
function rgbToHex(rgb) {
  const match = rgb.match(/\d+/g);
  if (!match || match.length < 3) return null;
  const [r, g, b] = match.map(Number);
  return (
    "#" +
    [r, g, b]
      .map(x => x.toString(16).padStart(2, "0"))
      .join("")
      .toLowerCase()
  );
}

// Applies styles
function applyDarkModeToElement(el) {
  if (!(el instanceof HTMLElement)) return;

  const styles = getComputedStyle(el);

  const colorHex = rgbToHex(styles.color);
  if (colorHex && colorSwaps[colorHex]) {
    el.style.setProperty("color", colorSwaps[colorHex], "important");
  }

  const bgColorHex = rgbToHex(styles.backgroundColor);
  if (bgColorHex && backgroundColorSwaps[bgColorHex]) {
    el.style.setProperty("background-color", backgroundColorSwaps[bgColorHex], "important");
  }

  const bg = styles.background;
  const bgHex = rgbToHex(bg);
  if (bgHex && backgroundSwaps[bgHex]) {
    const updated = bg.replace(/(rgb|rgba)\([^)]+\)/gi, backgroundSwaps[bgHex]);
    el.style.setProperty("background", updated, "important");
  }
}

// Initial pass
document.querySelectorAll("*").forEach(applyDarkModeToElement);

// MutationObserver
const observer = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === 1) {
        applyDarkModeToElement(node);
        node.querySelectorAll?.("*").forEach(applyDarkModeToElement);
      }
    });
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
