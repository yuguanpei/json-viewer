var nodes, interval;
interval = setInterval(() => {
  nodes = document.body && document.body.childNodes;
  if (nodes) {
    clearInterval(interval);
    if (nodes && nodes.length > 0 && nodes[0].tagName === "PRE") {
      chrome.storage.local.set({
        data: {
          href: location.href,
          text: nodes[0].textContent,
        },
      });
      nodes.forEach(function (node) {
        node.style.display = "none";
      });
      var iframe = document.createElement("iframe");
      iframe.setAttribute("src", chrome.runtime.getURL("index.html"));
      iframe.setAttribute(
        "style",
        "border: 0; width: 100%; height: 100%; position: absolute;"
      );
      document.body.appendChild(iframe);
    }
  }
}, 100);
