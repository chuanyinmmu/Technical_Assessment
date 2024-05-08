const httpStatus = require("http-status");
const fs = require("fs");
const csvParser = require("csv-parser");

const ApiError = require("../utils/ApiError");

const updateFile = async (file) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(file)
      .pipe(
        csvParser({
          mapHeaders: ({ header }) => {
            if (header.charCodeAt(0) === 0xfeff) {
              header = "postId";
            }
            return header;
          },
        })
      )
      .on("headers", (headers) => {
        const missingHeaders = ["postId", "id", "name", "email", "body"].filter((header) => !headers.includes(header));
        const invalidHeaders = headers.filter((header) => !["postId", "id", "name", "email", "body"].includes(header));

        if (missingHeaders.length > 0) {
          return reject(new ApiError(httpStatus.BAD_REQUEST, `Missing headers: ${missingHeaders.join(", ")}`));
        }
        if (invalidHeaders.length > 0) {
          return reject(new ApiError(httpStatus.BAD_REQUEST, `Invalid headers: ${invalidHeaders.join(", ")}`));
        }
      })
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", () => {
        return reject(new ApiError(httpStatus.BAD_REQUEST, "Upload Fail"));
      });
  });
};

module.exports = {
  updateFile,
};
