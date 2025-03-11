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
        res.status(400).json({ massage: "Error While Adding Resource", err })
    })
}
exports.getUserResources = async (req, res) => {
    await resourceModel.find({ user: req.user._id }).populate([{path:'user',select:'name'},{path:'resourceType',select:'resourceName'}]).then((allResources)=>{
        res.status(200).json(allResources); 
    }).catch((err)=>{
        res.status(400).json({ massage: "Error While Fetching Resource", err })
    })
    
}

exports.closeResource = async (req, res) => {
    const { resourceId } = req.body;
    await resourceModel.findByIdAndDelete(
        {
            $and: [
                { _id: resourceId },
                { user: req.user._id }
            ]
        }

    
        

    ).then(() => {
        res.status(200).json({ massage: "Resource Closed Succsesfully" })
    }).catch((err) => {
        res.status(400).json({ massage: "Error While Closing Resource", err })
    })
}