import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = AsyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(400, "Invalid token");
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!decodedToken) {
    throw new ApiError(401, "Invalid token verify");
  }

  const user = await User.findById(decodedToken?._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(401, "Invalid user token");
  }
  res.user = user;
  next();
});
