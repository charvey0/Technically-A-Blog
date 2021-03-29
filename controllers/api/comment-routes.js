const router = require('express').Router();
const Comment = require('../../models/Comment');

// route to create/add a comment
router.post('/', async (req, res) => {
  try { 
    const commentData = await Comment.create({
    post: req.body.post,
    body: req.body.body,
    user: req.body.user,
    date: req.body.date,
  });
  res.status(200).json(commentData)
} catch (err) {
  res.status(400).json(err);
}
});

// route to edit a comment
router.put('/:id', async (req, res) => {
  try {
    const comment = await Comment.update(
    {
        body: req.body.body,
        user: req.body.user,
        date: req.body.date,
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
router.delete(':id', (req, res) => {
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
