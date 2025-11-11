import { ApiError } from "./ApiError.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDE_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const uploadOnCloudinary = async (localFile) => {
  try {
    if (!localFile) {
      throw new ApiError(401, "file does not exist");
    }
    const response = await cloudinary.uploader.upload(localFile, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFile);
    return response;
  } catch (error) {
    fs.unlinkSync(localFile);
    return null;
  }
};

export default uploadOnCloudinary;
