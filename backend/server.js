import app from "./app.js";
import connectDB from "./src/db/db.js";

const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  res.send("hello world");
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`databases connected port on ${port}`);
    });
  })
  .catch((err) => console.log(err));
