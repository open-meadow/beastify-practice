(() => {
  if(window.hasRun) {
    return;
  }

  window.hasRun = true;

  const insertBeast = (beastURL) => {
    removeExistingBeasts();
    const beastImage = document.createElement("img");
    beastImage.setAttribute("src", beastURL);
    beastImage.style.height = "100vh";
    beastImage.className = "beastify-image";
    document.body.appendChild(beastImage);
  }

  const removeExistingBeasts = () => {
    const existingBeasts = document.querySelectorAll(".beastify-image");
    for (const beasts of existingBeasts) {
      beasts.remove();
    }
  }

  browser.runtime.onMessage.addListener((message) => {
    if(message.command === "beastify") {
      insertBeast(message.beastURL);
    } else if (message.command === "reset") {
      removeExistingBeasts();
    }
  });
})();