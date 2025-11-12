import app from "./app.js";
import connectDB from "./src/db/db.js";
import { VercelRequest, VercelResponse } from "@vercel/node";
import serverless from "serverless-http";

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`databases connected port on ${port}`);
    });
  })
  .catch((err) => console.log(err));

export const handler = serverless(app);
export default handler;
