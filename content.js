var nodes = document.body && document.body.childNodes;
if (nodes && nodes.length > 0 && nodes[0].tagName === "PRE") {
  try {
    var data = JSON.parse(nodes[0].textContent);
    chrome.storage.local.set({ data });
    nodes.forEach(function (node) {
      node.style.display = "none";
    });
    var iframe = document.createElement("iframe");
    iframe.setAttribute("src", chrome.runtime.getURL("index.html"));
    iframe.setAttribute("style", "border: 0; width: 100%; height: 100%; position: absolute;");
    document.body.appendChild(iframe);
  } catch (error) {
    console.error(error);
  }
}
