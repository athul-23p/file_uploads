const express = require("express");
const fs = require('fs');
const router = express.Router();
const upload = require("../middlewares/uploads");
const User = require('../models/user.model');
const path = require('path');

router.get("", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("", upload.single("profilePic"), async (req, res) => {
  try {

    const user = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      profile_pic: req.file.path,
    });
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch("/:id",upload.single("profilePic"),async (req,res) =>{
     try {
  
        let user = await User.findByIdAndUpdate(req.params.id, req.body,{new:true});

        if(req.file.path){
            let path = user.profile_pic;
            
            fs.unlink(path, (err => {
                if(err){
                    console.log(err);
                }else{
                    console.log('deleted profile pic');
                }
            }));           
            user =  await User.findByIdAndUpdate(req.params.id,{profile_pic : req.file.path},{new:true});
            
        }
       return res.status(200).send(user);
     } catch (err) {
       return res.status(500).send({ message: err.message });
     }

});

router.delete("/:id", async (req, res) => {
  try { 
    
    let user = await User.findByIdAndRemove(req.params.id);
    let profile_pic_path = user.profile_pic;
    // console.log(profile_pic_path);
    if (profile_pic_path){
        fs.unlink(profile_pic_path, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("deleted",path.basename(profile_pic_path));
          }
        });
    }

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
