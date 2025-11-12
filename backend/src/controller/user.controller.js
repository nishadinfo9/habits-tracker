import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  user.refreshToken = refreshToken;

  return { accessToken, refreshToken };
};

const registerUser = AsyncHandler(async (req, res) => {
  // get data from frontend✔️
  // check data validation✔️
  // check already exist✔️
  // get file path✔️
  // validation file path✔️
  // upload image on cloudinary❌
  // check image uplode complete❌
  // create usre include fullName, email ✔️
  // return res.status(200).res.json()✔️

  const { fullName, email, password } = req.body;
  if ([fullName, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(401, "all fields are invalid");
  }

  const existUser = await User.findOne({ email });

  if (existUser) {
    throw new ApiError(401, "user already exist");
  }

  // const avatarFile = req?.files?.avatar[0]?.path;
  // if (!avatarFile) {
  //   throw new ApiError("avatar does not exist");
  // }
  // console.log(avatarFile);
  // const uploadUrl = await uploadOnCloudinary(avatarFile);

  // if (!uploadUrl) {
  //   throw new ApiError(401, "avatar upload faild");
  // }

  const user = await User.create({
    fullName,
    email,
    password,
    avatar: "",
  });

  const createUser = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, createUser, "user registered successfully"));
});

const loggedInUser = AsyncHandler(async (req, res) => {
  // get data from fronted
  // data validation
  // user find
  // validation
  // password check
  // validation
  // send cookie
  // create finduser -password

  const { email, password } = req.body;

  if (!(email || password)) {
    throw new ApiError(401, "email and password does not exist");
  }

  // const user = await User.findOne({$or: [{email}, {username}]})
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "user does not exist");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "password does not match");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loginUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loginUser, accessToken, refreshToken },
        "user login successfully"
      )
    );
});

const logoutUser = AsyncHandler(async (req, res) => {
  console.log("first");
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { refreshToken: undefined },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logout successfully"));
});

const accessTokenRefreshed = AsyncHandler(async (req, res) => {
  const token = req?.cookies?.refreshToken || req?.body?.refreshToken;
  if (!token) {
    throw new ApiError(400, "token does not exist");
  }
  try {
    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    if (!decodedToken) {
      throw new ApiError(400, "Invalid token verify");
    }

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "user does not find");
    }
    console.log(user);

    if (token !== user?.refreshToken) {
      throw new ApiError("Invalid user");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(400, error?.message || "refresh token invalid");
  }
});

const currentPasswordChange = AsyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confromPassword } = req.body;

  if (!(oldPassword, newPassword, confromPassword)) {
    throw new ApiError(400, "password is required");
  }

  if (newPassword !== confromPassword) {
    throw new ApiError(401, "newPassword and confromPassword does not match");
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(400, "user does to exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Password");
  }

  user.password = newPassword;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "password changed successfully"));
});

const currentUser = AsyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "current user fetch successfully"));
});

export {
  registerUser,
  loggedInUser,
  logoutUser,
  accessTokenRefreshed,
  currentPasswordChange,
  currentUser,
};
