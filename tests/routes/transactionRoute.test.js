const request = require("supertest");
const app = require("../../index");

describe("Transaction Routes", () => {
  it("should return transactions for a user", async () => {
    const res = await request(app).get("/transaction/getmyAll");
    expect(res.statusCode).toBe(200);
  });

  it("should create a new transaction", async () => {
    const res = await request(app).post("/transaction/createNew").send({
      userId: "123",
      amount: 100,
      category: "Food",
      type: "expense",
    });
    expect(res.statusCode).toBe(201);
  });
});
