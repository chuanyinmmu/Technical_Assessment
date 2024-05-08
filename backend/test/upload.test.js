const fs = require("fs");
const request = require("supertest");
const app = require("../src/app");

describe("CSV Upload Endpoint Tests", () => {
  it("POST /v1/upload should upload a CSV file", async () => {
    const fileData = fs.readFileSync(`${__dirname}/data.csv`);
    const response = await request(app).post("/v1/upload").attach("theCSV", fileData, "data.csv");
    expect(response.status).toEqual(200);
  });

  it("POST /v1/upload should handle when no file is provided", async () => {
    const response = await request(app).post("/v1/upload");

    expect(response.status).toEqual(400);
  });

  it("POST /v1/upload should handle invalid header 1", async () => {
    const fileData = fs.readFileSync(`${__dirname}/data-test1.csv`);
    const response = await request(app).post("/v1/upload").attach("theCSV", fileData, "data-test1.csv");
    expect(response.status).toEqual(400);
  });

  it("POST /v1/upload should handle invalid header 2", async () => {
    const fileData = fs.readFileSync(`${__dirname}/data-test2.csv`);
    const response = await request(app).post("/v1/upload").attach("theCSV", fileData, "data-test1.csv");
    expect(response.status).toEqual(400);
  });

  it("POST /v1/upload should handle invalid file type", async () => {
    const fileData = fs.readFileSync(`${__dirname}/data.pdf`);
    const response = await request(app).post("/v1/upload").attach("theCSV", fileData, "data.pdf");
    expect(response.status).toEqual(400);
  });
});
