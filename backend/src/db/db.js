import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const respons = await mongoose.connect(`${process.env.URI}`);
    console.log("mongoDB connected on port", respons.connection.host);
  } catch (error) {
    console.log("mongoDB server connecting error");
    process.exit(1);
  }
};
export default connectDB;
