const resourceModel=require('../models/ResourceModels/resorceModel');

exports.getAllResources = async (req, res) => {
    const allResources = await resourceModel.find()
    res.status(200).json(allResources);
}

exports.openResource = async (req, res) => {
    const { resourceType } = req.body;
    const newResource = new resourceModel({
        user: req.user._id,
        resourceType: resourceType
        
    })
    await newResource.save().then(() => {
        res.status(200).json({ massage: "Resource Opened Succsesfully" })
    }).catch((err) => {
        res.status(400).json({ massage: "Error While Adding Resource", err ,resourceType})
    })
}