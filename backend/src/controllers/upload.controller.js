const httpStatus = require("http-status");

const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const updateFileService = require("../services/upload.service");

const updateFile = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No file uploaded");
  }

  if (req.file.mimetype !== "text/csv") {
    throw new ApiError(httpStatus.BAD_REQUEST, "Only CSV file is allowed");
  }

  const results = await updateFileService.updateFile(req.file.path);
  res.status(200).json(results);
});

module.exports = {
  updateFile,
};
