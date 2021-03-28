const router = require('express').Router();
const Post = require('../../models/Post');

// route to create/add a post
router.post('/post/', async (req, res) => {
  try { 
    const postData = await Post.create({
    title: req.body.title,
    body: req.body.body,
    user: req.body.user,
    date: req.body.date,
  });
  res.status(200).json(postData)
} catch (err) {
  res.status(400).json(err);
}
});

// route to edit a post
router.put('/post/:id', async (req, res) => {
  try {
    const post = await Post.update(
    {
        title: req.body.title,
        body: req.body.body,
        user: req.body.user,
        date: req.body.date,
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
router.delete('/post/:id', (req, res) => {
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
