const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

// route to get all posts
router.get('/', async (req, res) => {
    const postData = await Post.findAll().catch((err) => { 
        res.json(err);
      });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('all', { posts });
      });
  
  
  
  
  
  
// route to get one post




  //TODO : add comments for the post


  router.get('/post/:id', async (req, res) => {
    try{ 
        const postData = await Post.findByPk(req.params.id);
        if(!postData) {
            res.status(404).json({message: 'No post with this id!'});
            return;
        }
        const post = postData.get({ plain: true });
        res.render('post', post);
      } catch (err) {
          res.status(500).json(err);
      };     
  });

module.exports = router;