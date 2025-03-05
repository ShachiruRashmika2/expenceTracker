exports.getOne=(req,res)=>{

    res.send("Get one Modified");
}
exports.makeOne=(req,res)=>{

    res.status(200).json({masage:"Created"});
}
exports.updateOne=(req,res)=>{

    res.status(200).json({massage:`Updated ${req.params.id}`});
}
exports.deleteOne=(req,res)=>{

    res.status(200).json({massage:`Deleted ${req.params.id}`});
}