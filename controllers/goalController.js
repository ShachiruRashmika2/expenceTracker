const Goal = require('../models/goalModel'); 
const resourceTypeModel = require('../controllers/resourceTypeController');
const resourceController = require('../controllers/resourceController');

exports.createGoal = async (req, res) => {
    const { duration, goalName, description } = req.body;

    req.body.accountType = "67cfcd3c1ef9e92988ec11f6";
    req.body.resourceName = "Goal";

    try {
        // Create resourceType and extract _id from the returned JSON
        const resourceTypeResponse = await resourceTypeModel.createResourceType(req, res);
        console.log('ResourceType Created');
        
        if (!resourceTypeResponse || !resourceTypeResponse._id) {
            return res.status(400).json({ message: 'Failed to create resource type' });
        }

        req.body.resourceType = resourceTypeResponse._id;

        // Create resource and extract the resource object from the returned JSON
        const resourceResponse = await resourceController.openResource(req, res);
        console.log('Resource Created');

        if (!resourceResponse || !resourceResponse._id) {
            return res.status(400).json({ message: 'Failed to create resource' });
        }

        // Now, create the Goal
        const goal = new Goal({
            user: req.user._id,
            resource: resourceResponse,
            duration,
            goalName,
            description
        });

        const createdGoal = await goal.save();
        res.status(201).json({ message: "Goal Created", createdGoal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
