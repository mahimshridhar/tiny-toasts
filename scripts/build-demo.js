const fs = require("fs");
const path = require("path");

const template = fs.readFileSync("demo.html", "utf-8");

const injected = template.replace(
  "<!-- INJECT_DEMO_HERE -->",
  '<script src="https://unpkg.com/tiny-toasts"></script>'
);

fs.mkdirSync("demo", { recursive: true });
fs.writeFileSync("demo/index.html", injected);

console.log("✅ Demo built at demo/index.html");
