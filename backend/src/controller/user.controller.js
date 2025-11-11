import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const registerUser = AsyncHandler((req, res) => {
  const { fullName, email, password, avatar } = req?.body;
  if ([fullName, email, password, avatar].some((field) => field?.trim(""))) {
    throw new ApiError(401, "all fields are invalid");
  }
  

});

export { registerUser };
