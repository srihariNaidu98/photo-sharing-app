const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const multer = require("multer");
const fs = require("fs");
const path = require("path");


router.post("/list", function (req, res) {
    console.log(req.body)
    let query={}
    if(req.body?.name){
        query={...query, $text: { $search: req.body?.name}}
    }

    if(req.body?.date){
        const dateString = req.body.date;
        const startDate = new Date(dateString);
        query={...query, createdAt: { $gt: startDate } }     
    }

    if(req.body?.tags){
        query={...query, tag:{$in:req.body?.tags} }     
    }
    console.log("query",query)
	Post.find(query)
		.then((result) => {
			res.status(200).json(result);
			//console.log(result);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		// Uploads is the Upload_folder_name
		cb(null, "public/uploads");
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + "-" + Date.now() + ".jpg");
	},
});
var upload = multer({ storage: storage });



router.post("/upload", upload.single("image"), async (req, res, next) => {
    try{
        var imagePath = req.file.path.replace("public", "");
        const contentType = req.file.mimetype;
	
        var obj = {
            name: req.body.name,
            tag: req.body.tag,
            imagePath
        };
        const newPhoto = new Post(obj);
        await newPhoto.save();
        res.status(201).json(newPhoto);
    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Failed to create the photo.' });
    }
});

router.get('/view/:id', async (req, res,next) => { 
    const id = req.params.id;
    console.log(req.body)
    try{

        const updatedPost=await Post.findOne({_id:id})
        res.status(201).json(updatedPost);
    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Failed to update like the photo.' });
    }
  }) 

router.put('/like/:id', async (req, res,next) => { 
    const id = req.params.id;
    console.log(req.body)
    try{

        const updatedPost=await Post.findOneAndUpdate({_id:id},{$inc: { likes: 1 }},{new:true})
        res.status(201).json(updatedPost);
    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Failed to update like the photo.' });
    }
  }) 

router.put('/message/:id', async (req, res,next) => { 
    const postId = req.params.id;
    console.log(req.body,"comment post")
    try{

        const updatedPost=await Post.findOneAndUpdate({_id: postId},{$push:{message:{$each:req.body.message}}},{new:true})
        res.status(201).json(updatedPost);
    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Failed to update like the photo.' });
    }
  }) 

router.get('/download/:id', async (req, res) => {
    try {
      const postId = req.params.id;
      console.log("postId",postId)
  
      const post = await Post.findById({_id: postId});
  
      if (!post || !post.imageBuffer) {
        return res.status(404).send('Image not found.');
      }

      const base64Image = post.imageBuffer.toString('base64');
  
      // Set the appropriate response headers for image download
      res.set('Content-Type', 'image/jpeg');
      res.set('Content-Disposition', `attachment; filename=${postId}.jpg`);
  
      // Send the base64 encoded image string as the response body
      res.send(base64Image);
    } catch (err) {
      console.error('Error while retrieving the image:', err);
      res.status(500).send('Internal server error.');
    }
  });

module.exports = router;