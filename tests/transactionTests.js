const { createTransaction } = require('../controllers/transactionController');
const { transaction } = require('../models/TransactionModels/transactionsModel');
const jest=require('jest');
jest.mock('../models/TransactionModels/transactionsModel', () => ({
    transaction: jest.fn()
}));

describe('Create Transaction', () => {
    let req, res;

    beforeEach(() => {
        req = { 
            user: { _id: 'user123' }, 
            body: { amount: 100, category: 'food', resource: 'res123', frequencyType: 'onetime', curruncy: 'USD' } 
        };
        res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    });

    test('should create a transaction successfully', async () => {
        transaction.mockImplementation(() => ({ save: jest.fn().mockResolvedValue({ id: 'trans123', amount: 100 }) }));
        await createTransaction(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});
