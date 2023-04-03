const hidePage = `body > :not(.beastify-image) {
  display: none;
}`;

const listenForClicks = () => {
  document.addEventListener("click", (e) => {
    const beastNameToUrl = (beastName) => {
      switch (beastName) {
        case "Frog":
          return browser.runtime.getURL("beasts/frog.jpg");
        case "Snake":
          return browser.runtime.getURL("beasts/snake.jpg");
        case "Turtle":
          return browser.runtime.getUrl("beasts/turtle.jpg");
      }
    };

    const beastify = (tabs) => {
      browser.tabs.insertCSS({ code: hidePage }).then(() => {
        const url = beastNameToUrl(e.target.textContent);
        browser.tabs.sendMessage(tabs[0].id, {
          command: "beastify",
          beastURL: url,
        });
      });
    };

    const reset = (tabs) => {
      browser.tabs.removeCSS({ code: hidePage }).then(() => {
        browser.tabs.sendMessage(tabs[0].id, {
          command: "reset",
        });
      });
    };

    const reportError = (error) => {
      console.error(`Could not beastify: ${error}`);
    };

    if (e.target.tagName !== "BUTTON" || !e.target.closest("#popup-content")) {
      return;
    }

    if (e.target.type === "reset") {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(reset)
        .catch(reportError);
    }
  });
};

