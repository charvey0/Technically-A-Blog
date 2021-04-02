const router = require('express').Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');

// route to get all posts
router.get('/', async (req, res) => {
    const postData = await Post.findAll(
//      [{ include: Comment }]
     ).catch((err) => { 
        res.json(err);
      });
      console.log(postData);
      const posts = postData.map((post) => post.get({ plain: true }));
        res.render('all', { posts });
      });
  

module.exports = router;