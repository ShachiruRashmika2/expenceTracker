const getoneModel=require('../models/getoneModel')





exports.getOne=(req,res)=>{

    const Allgetones=getoneModel.find();
    res.status(200).json(Allgetones);

   // res.send("Get one Modified");
}
exports.makeOne=async(req,res)=>{

    const theOne=new getoneModel({
        name:req.body.name,
        age:req.body.age
    })
    
    await theOne.save().then(()=>{

        res.status(200).json({massage:"Item Added"})
    }).catch((err)=>{
        res.status(400).json({massage:"error while Adding",err})
    })



    //res.status(200).json({masage:req.body});

}
exports.updateOne=(req,res)=>{

    res.status(200).json({massage:`Updated ${req.params.id}`});
}
exports.deleteOne=(req,res)=>{

    res.status(200).json({massage:`Deleted ${req.params.id}`});
}