let express = require("express");
let app = express();
let browser = require("./browser");
browser.init();

app.get("/page/:url/:tag/:attribute?", async (req, res) => {
  let response = await browser.run(
    `http://${req.params.url}`,
    req.params.tag,
    req.params.attribute
  );
  res.send(response);
});

app.listen(3333, () => console.log("Listening on 3333..."));
