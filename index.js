const fileExtensionToLanguageMap = {
  js: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",
  json: "json",
  html: "html",
  htm: "html",
  css: "css",
  scss: "scss",
  sass: "sass",
  less: "less",
  md: "markdown",
  markdown: "markdown",
  php: "php",
  py: "python",
  py3: "python",
  rb: "ruby",
  java: "java",
  c: "c",
  cpp: "cpp",
  h: "c",
  hpp: "cpp",
  cs: "csharp",
  sh: "shell",
  bash: "shell",
  sql: "sql",
  pl: "perl",
  go: "go",
  lua: "lua",
  r: "r",
  swift: "swift",
  yml: "yaml",
  yaml: "yaml",
  xml: "xml",
  xaml: "xml",
  bat: "bat",
  ps1: "powershell",
  ini: "ini",
  toml: "toml",
  coffee: "coffeescript",
  rs: "rust",
  dart: "dart",
  groovy: "groovy",
  kt: "kotlin",
  kts: "kotlin",
  v: "verilog",
  sv: "systemverilog",
  tex: "latex",
  cls: "latex",
  vbs: "vbscript",
  lua: "lua",
  pl: "perl",
  scala: "scala",
  pas: "pascal",
  pp: "pascal",
  f90: "fortran",
  f: "fortran",
  f95: "fortran",
  f03: "fortran",
  f08: "fortran",
  asm: "assembly",
  s: "assembly",
  lisp: "lisp",
  clj: "clojure",
  cljs: "clojure",
  cljc: "clojure",
  edn: "clojure",
  erl: "erlang",
  hrl: "erlang",
  ex: "elixir",
  exs: "elixir",
  elm: "elm",
  haskell: "haskell",
  hs: "haskell",
  lhs: "haskell",
  nim: "nim",
  nims: "nim",
  v: "vlang",
  vb: "visual-basic",
  vba: "visual-basic",
  adb: "ada",
  ads: "ada",
  ml: "ocaml",
  mli: "ocaml",
  sml: "sml",
  thy: "isabelle",
  dockerfile: "dockerfile",
  gitignore: "ignore",
  tex: "tex",
  bib: "bibtex",
  // add more mappings as needed
};

// Function to get language from file extension
function getLanguageByExtension(url) {
  // Use a URL object to parse the full URL
  const parsedUrl = new URL(url);

  // Extract the pathname from the URL
  const pathname = parsedUrl.pathname;

  // Find the last '.' in the pathname and get the substring after it
  const extension = pathname.includes(".")
    ? pathname.substring(pathname.lastIndexOf(".") + 1)
    : "";

  // Map the extension to a language, defaulting to 'plaintext' if not found
  return fileExtensionToLanguageMap[extension] || "plaintext";
}

chrome.storage.local.get(["data"], (res) => {
  var dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  require.config({ paths: { vs: "monaco-editor/min/vs" } });
  require(["vs/editor/editor.main"], function () {
    var value = res.data.text,
      language = getLanguageByExtension(res.data.href);
    try {
      value = JSON.stringify(JSON.parse(value), null, 2);
      language = "json";
    } catch (error) {
      // console.log(error);
    }
    var editor = monaco.editor.create(document.getElementById("container"), {
      value,
      language,
      readOnly: true,
      theme: dark ? "vs-dark" : "vs-light",
      scrollBeyondLastLine: true,
    });
    window.addEventListener("resize", function () {
      editor.layout();
    });
  });
});
