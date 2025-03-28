const userController = require("../../controllers/userController");
const User = require("../../models/userModel");

jest.mock("../../models/userModel");

describe("User Controller", () => {
  it("should return user data", async () => {
    User.findById.mockResolvedValue({ _id: "1", name: "John" });

    const req = { params: { id: "1" } };
    const res = { json: jest.fn() };

    await userController.getUser(req, res);
    expect(res.json).toHaveBeenCalledWith({ _id: "1", name: "John" });
  });
});
