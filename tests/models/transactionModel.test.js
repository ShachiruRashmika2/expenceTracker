const Transaction = require("../../models/TransactionModels/transactionsModel");

describe("Transaction Model", () => {
  it("should create a transaction with valid data", async () => {
    const transaction = new Transaction({ userId: "123", amount: 100, category: "Food", type: "expense" });
    await expect(transaction.validate()).resolves.toBeUndefined();
  });

  it("should fail when required fields are missing", async () => {
    const transaction = new Transaction({});
    await expect(transaction.validate()).rejects.toThrow();
  });
});
