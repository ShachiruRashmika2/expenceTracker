const Goal = require('../models/goalModel'); 
const resourceTypeModel=require('../controllers/resourceTypeController');
const resourceController=require('../controllers/resourceController');


exports.createGoal = async (req, res) => {
    const {  duration, goalName, description } = req.body;

    req.body.accountType="67cfcd3c1ef9e92988ec11f6";
    req.body.resourceName="Goal";
    const resourceType = await resourceTypeModel.createResourceType(req, res).then(()=>{
        console.log('resourceType Created');
        req.body.resourceType=resourceType._id;
    }).catch((err)=>{
        console.log(err);
    });

    const reso= await resourceController.openResource(req,res).then((reso)=>{
        console.log('resourceType Created');



    }).catch((err)=>{
        console.log(err);
    });

    try {
        const goal = new Goal({
            user:req.user._id,
            resource:reso,
            duration,
            goalName,
            description
        });

        const createdGoal = await goal.save();
        res.status(201).json({massage:"Goal Created",createdGoal});
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

