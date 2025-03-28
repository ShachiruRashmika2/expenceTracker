const request = require("supertest");
const app = require("../../index");

describe("User Routes", () => {
  it("should return user details", async () => {
    const res = await request(app).get("/user/profile");
    expect(res.statusCode).toBe(200);
  });
});
