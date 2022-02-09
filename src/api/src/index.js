const app = require("./app");

app.listen(3000, (err, address) => {
  if (err) {
    console.log(err);
  }
  console.log("Listening on port 3000");
});
