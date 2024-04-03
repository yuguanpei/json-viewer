chrome.storage.local.get(["data"], (res) => {
  var dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  require.config({ paths: { vs: "monaco-editor/min/vs" } });
  require(["vs/editor/editor.main"], function () {
    var editor = monaco.editor.create(document.getElementById("container"), {
      value: JSON.stringify(res.data, null, 2),
      language: "json",
      readOnly: true,
      theme: dark ? "vs-dark" : "vs-light",
      scrollBeyondLastLine: true,
    });
    window.addEventListener("resize", function () {
      editor.layout();
    });
  });
});
