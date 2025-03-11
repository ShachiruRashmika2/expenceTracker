const resourceTypeModel = require('../models/ResourceModels/resourceTypeModel');
const {accountType} = require('../models/ResourceModels/accountTypeModel');
const user = require('../models/userModel');

exports.getAllResourceTypes = async (req, res) => {
    const allResourceTypes = await resourceTypeModel.find().populate([{path:'createdBy',select:'Type name'},{path:'accountType',select:'accountType'}]).exec();
    res.status(200).json(allResourceTypes);
}  
exports.createResourceType = async (req, res) => {

    const accType= await accountType.findById(req.body.accountType);

    if (!accType) {
        return res.status(404).json({ message: 'Account Type not found' });
    }else{

        const CreatedBy=accType.accountType==='Custom'?req.user._id:accType.createdBy;
    const newResourceType = new resourceTypeModel({

        accountType: req.body.accountType,
        resourceName: req.body.resourceName,

        createdBy:CreatedBy

        
    })

    await newResourceType.save().then((r) => {
        res.status(200).json({ massage: "Resource Type Created Succsesfully" ,r})
    }).catch((err) => {
        res.status(400).json({ massage: "Error While Adding Resource Type", err,a:accType.createdBy})
    })
}
}
exports.getUserResourceTypes = async (req, res) => {
    const adminUsers = await user.find({ Type: "Admin" }).select("_id");
    const allResourceTypes = await resourceTypeModel.find(
       {
        $or: [
            { createdBy: req.user._id },
            { createdBy: { $in: adminUsers.map(user => user._id) } }
        ]
       }
    ).populate([{path:'createdBy',select:'Type name'},{path:'accountType',select:'accountType'}]).exec();
    
    res.status(200).json(allResourceTypes);
}