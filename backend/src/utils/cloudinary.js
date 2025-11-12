import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const uploadOnCloudinary = async (localFile) => {
  try {
    if (!localFile) return null;
    const response = await cloudinary.uploader.upload(localFile, {
      resource_type: "auto",
    });
    console.log("first", response);
    fs.unlinkSync(localFile);
    return response;
  } catch (error) {
    fs.unlinkSync(localFile);
    return null;
  }
};

export default uploadOnCloudinary;
