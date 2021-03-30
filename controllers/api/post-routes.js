const router = require('express').Router();
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const User = require('../../models/User');


// route to get post by id
router.get('/:id', async (req, res) => {
  try{ 
      const postData = await Post.findByPk(req.params.id, {
        include: [{
          model: Comment, User
        }]
      });
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

// route to create/add a post
router.post('/', async (req, res) => {
  try { 
    const postData = await Post.create({
    title: req.body.title,
    body: req.body.body,
    user_id: req.body.user_id,
  });
  res.status(200).json(postData)
} catch (err) {
  res.status(400).json(err);
}
});

// route to edit a post
router.put('/:id', async (req, res) => {
//   {
//     "title": "Post Number 1",
//     "body": "Lorem ipsum dolor sit amet, consectetur.",
//     "user_id": "1"
// }

  try {
    const post = await Post.update(
    {
        title: req.body.title,
        body: req.body.body,
        user_id: req.body.user_id,
    },
    {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(post);
  } catch (err) {
      res.status(500).json(err);
    };
});

// Delete route for a post
router.delete('/:id', (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedPost) => {
        res.json(deletedPost);
      })
      .catch((err) => res.json(err));
  });


module.exports = router;
