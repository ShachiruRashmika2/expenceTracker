const resourceTypeModel = require('../models/ResourceModels/resourceTypeModel');
const {accountType} = require('../models/ResourceModels/accountTypeModel');
const user = require('../models/userModel');

exports.getAllResourceTypes = async (req, res) => {
    const allResourceTypes = await resourceTypeModel.find();
    res.status(200).json(allResourceTypes);
}   

exports.createResourceType = async (req, res) => {

    const accType= await accountType.findById(req.body.accountType);
    if (!accType) {
        return res.status(404).json({ message: 'Account Type not found' });
    }else{
 const createdUser= await user.findById(accType.createdBy);
    const newResourceType = new resourceTypeModel({

        accountType: req.body.accountType,
        resourceName: req.body.resourceName,

        createdBy:createdUser.Type

        
    })

    await newResourceType.save().then(() => {
        res.status(200).json({ massage: "Resource Type Created Succsesfully" })
    }).catch((err) => {
        res.status(400).json({ massage: "Error While Adding Resource Type", err,a:createdUser.Type })
    })
}
}