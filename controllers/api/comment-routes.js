const router = require('express').Router();
const Comment = require('../../models/Comment');
const Post = require('../../models/Post');


// route to get comments by post_id
router.get('/:id', async (req, res) => {
  try{ 
       const postData = await Post.findByPk(req.params.id);
      if(!postData) {
          res.status(404).json({message: 'No post with this id!'});
          return;
      }
      const post = postData.get({ plain: true });
      res.render('comment-add', post);
    } catch (err) {
        res.status(500).json(err);
    };     
});

// route to create/add a comment
router.post('/:id', async (req, res) => {
  try { 
    const commentData = await Comment.create({
    post_id: req.body.req.params.id,
    body: req.params.body,
    user_id: "2",
  });
  res.status(200).json(commentData);
} catch (err) {
  res.status(400).json({ message: 'not created' });
}
});

// route to edit a comment
router.post('/edit/:id', async (req, res) => {
  try {
    const comment = await Comment.update(
    {
        body: req.body.body
    },
    {
      where: {
        post: req.params.id,
      },
    });
    res.status(200).json(comment);
  } catch (err) {
      res.status(500).json(err);
    };
});

// Delete route for a comment
router.delete('/:id', (req, res) => {
    Comment.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedComment) => {
        res.json(deletedComment);
      })
      .catch((err) => res.json(err));
  });


module.exports = router;
