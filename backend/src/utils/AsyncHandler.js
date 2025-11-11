const AsyncHandler = (reqestHandler) => {
  return (req, res, next) => {
    Promise.resolve(reqestHandler(req, res, next)).catch((err) => next(err));
  };
};
export { AsyncHandler };

// const AsyncHandlers = (func) => async (req, res, next) => {
//   try {
//     await func(req, res, next);
//   } catch (error) {
//     error
//       .status(error.code || 400)
//       .json(error.message, (error.success = false));
//   }
// };
