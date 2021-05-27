const express = require("express");
const app = express();

app.use(express.static("./dist/gestionEscolar"));

app.get("/*", (req, res) => {
  res.sendFile("index.html", { root: "dist/gestionEscolar" });
});

app.listen(process.env.PORT || 8080);
