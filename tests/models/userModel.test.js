const User = require("../../models/userModel");

describe("User Model", () => {
  it("should create a user with valid data", async () => {
    const user = new User({ name: "John", email: "john@example.com", password: "pass123" });
    await expect(user.validate()).resolves.toBeUndefined();
  });

  it("should fail when required fields are missing", async () => {
    const user = new User({});
    await expect(user.validate()).rejects.toThrow();
  });
});
