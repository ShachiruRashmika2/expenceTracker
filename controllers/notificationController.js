const notificationModel = require("../models/notificationModel");

exports.createNotification = async (userID,msg) => {
    
    try {
        const newNotification = new notificationModel({
            user: userID,
            message: msg,
           
        });

        await newNotification.save();

      console.log("Notification saved successfully");
    } catch (error) {
       console.log(error);
    }
}

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await notificationModel.find({ user: req.user._id });

        res.status(200).json({ notifications });
    } catch (error) {
        res.status(500).json({ message: "Error fetching notifications", error });
    }
}