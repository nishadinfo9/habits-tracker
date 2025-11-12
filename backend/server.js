import app from "./app.js";
import connectDB from "./src/db/db.js";
import serverless from "serverless-http";

const port = process.env.PORT || 3000;

connectDB()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

if (process.env.NODE_ENV !== "vercel") {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

export const handler = serverless(app);
export default handler;
