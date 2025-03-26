const resourceModel=require('../models/ResourceModels/resorceModel');
const resourceTypeModel=require('../models/ResourceModels/resourceTypeModel');
const budgetModel=require('../models/budgetModel');



exports.getAllResources = async (req, res) => {
    const allResources = await resourceModel.find().populate([{path:'user',select:'name'},{path:'resourceType',select:'resourceName'}])
    res.status(200).json(allResources);
}

exports.openResource = async (req, res) => {
    let { resourceType,budget } = req.body;
 
if(budget){
    await budgetModel.findById(budget).then((bgt) => {
        if (!bgt) {
            budget = null;
            console.log("Budget not found");
            return res.status(404).json({ message: "Budget not found" });
            

        }
        else{
            
            if (bgt.user.toString() !== req.user._id.toString()) {
                budget = null;
                console.log("You are not allowed to Add this budget");
                return res.status(403).json({ message: "You are not allowed to Add this budget" });
                
            }
            else{
                budget=bgt._id;
            }   

        }
    }).catch((err) => {
        return res.status(400).json({ massage: "Error While Fetching Budget", err })       
    }           
    ) }
    else{
        budget=null;
    }  




    await resourceTypeModel.findById(resourceType).then((resType) => {
        if (resType.resourceCreatedType==='Custom') {
           if(resType.resourceCreatedType==='Custom' && resType.createdBy!==req.user._id){
            return res.status(400).json({ message: "You are not allowed to open this resource", resourceCreatedType: resType.resourceCreatedType });
                resourceType=undefined;
           }
        }
   
       
    
    }).catch((err) => {
        return res.status(400).json({ massage: "Error While Fetching Resource Type", err })
    }

)
    const newResource = new resourceModel({
            user: req.user._id,
            resourceType: resourceType,
            budget:budget
            
        }); 

    await newResource.save().then(() => {
        return res.status(200).json({ massage: "Resource Opened Succsesfully" })
    }).catch((err) => {
        return res.status(400).json({ massage: "Error While Adding Resource", err ,user:req.user,resourceType:resourceType,budget:budget})
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
    try {
        const { resourceId } = req.params;

       
        const resource = await resourceModel.findById(resourceId);
        if (!resource) {
             res.status(404).json({ message: "Resource not found" });
        }


        if (resource.user.toString() !== req.user._id.toString()) {
             res.status(403).json({ message: "You are not allowed to close this resource" });
        }

        await resourceModel.findByIdAndDelete(resourceId);
         res.status(200).json({ message: "Resource closed successfully" });

    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }

}