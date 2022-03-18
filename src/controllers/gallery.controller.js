const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const upload = require('../middlewares/uploads');
const Gallery = require('../models/gallery.model');

// upload multiple photos
router.post("/:userId",upload.array('photos',5),async (req,res) => {
    try {
        
        let data = [];
        req.files.forEach(el => {
            data.push({
                user_id: req.params.userId,
                pic: el.path
            });
        });
        // console.log(data);
        let pics = await Gallery.create(data);
        return res.status(201).send(pics);
    } catch (error) {
        return res.status(500).send(error);
    }
})

// delete photo
router.delete('/:photoId',async(req,res)=>{
    try {
        let doc = await Gallery.findByIdAndDelete(req.params.photoId);

         fs.unlink(doc.pic, (err) => {
           if (err) {
             console.log(err);
           } else {
             console.log("deleted",path.basename(doc.pic));
           }
         });  
        return res.status(200).send(doc);
    } catch (error) {
        return res.status(500).send(error);
    }
})


module.exports = router;