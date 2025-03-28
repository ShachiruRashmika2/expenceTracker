const transactionController = require("../../controllers/transactionController");
const Transaction = require("../../models/TransactionModels/transactionsModel");

jest.mock("../../models/TransactionModels/transactionsModel");

describe("Transaction Controller", () => {
  it("should return transactions", async () => {
    Transaction.find.mockResolvedValue([{ _id: "1", amount: 50 }]);

    const req = { params: { userId: "123" } };
    const res = { json: jest.fn() };

    await transactionController.getTransactions(req, res);
    expect(res.json).toHaveBeenCalledWith([{ _id: "1", amount: 50 }]);
  });
});
