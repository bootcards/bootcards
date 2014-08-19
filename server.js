var express = require("express"),
    app = express(),
    port = parseInt(process.env.PORT, 10) || 3000;

app.get("/", function (req, res) {
  res.redirect("/samples/starter-template.html");
});

app.use(express.static(__dirname + '/'));

console.log("Simple static server listening at http://localhost:" + port);

app.listen(port);