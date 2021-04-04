const router = require('express').Router();
const Comment = require('../../models/Comment');
const Post = require('../../models/Post');
const User = require('../../models/User');


// routes to get comments by post_id
router.get('/:id', checkAuthenticated, async (req, res) => {
  try{ 
       const postData = await Post.findByPk(req.params.id);
      if(!postData) {
          res.status(404).json({message: 'No post with this id!'});
          return;
      }
      const post = postData.get({ plain: true });
      res.render('comment-add', { post: post, layout: 'user' });
    } catch (err) {
        res.status(500).json(err);
    };     
});

router.post('/:id', checkAuthenticated, async (req, res) => {
  try { 
    const id = req.user.dataValues.id;
    const userData = await User.findByPk(id);
    const user = userData.get({ plain: true });
    const username = user.username;

    const commentData = await Comment.create({
    post_id: req.params.id,
    body: req.body.body,
    user_id: req.user.dataValues.id,
    username: username,
  });
  const comment = commentData.get({ plain: true });
  const redir = '/api/post/' + comment.post_id;

  res.status(200).redirect(redir);
} catch (err) {
  res.status(400).json({ message: 'not created' });
}
});


// routes to edit a comment
router.get('/edit/:id', checkAuthenticated, async (req, res) => {
  try{ 
      const commentData = await Comment.findByPk(req.params.id);
      if(!commentData) {
          res.status(404).json({message: 'No comment with this id!'});
          return;
      }
      const comment = commentData.get({ plain: true });
      res.render('comment-edit', { comment: comment, layout: 'user' });
    } catch (err) {
        res.status(500).json(err);
    };     
});

router.post('/edit/:id', checkAuthenticated, async (req, res) => {
   try {
    const commentData = await Comment.findByPk(req.params.id);
    if(!commentData) {
        res.status(404).json({message: 'No comment with this id!'});
        return;
    }
    const comment = commentData.get({ plain: true });
    const redir = '/api/post/' + comment.post_id;
 
    await Comment.update(
     {
         body: req.body.body
     },
     {
       where: {
         id: req.params.id,
       },
     });
     res.status(200).redirect(redir);
//res.status(200).redirect('/dashboard');
   } catch (err) {
       res.status(500).json(err);
     };
 });


// routes to delete a comment
router.get('/delete/:id', checkAuthenticated, async (req, res) => {
  try{ 
      const commentData = await Comment.findByPk(req.params.id);
      if(!commentData) {
          res.status(404).json({message: 'No comment with this id!'});
          return;
      }
      const comment = commentData.get({ plain: true });
      res.render('comment-delete', { comment: comment, layout: 'user' });
    } catch (err) {
        res.status(500).json(err);
    };     
});

router.post('/delete/:id', checkAuthenticated, async (req, res) => {
   try {
    const commentData = await Comment.findByPk(req.params.id);
    if(!commentData) {
        res.status(404).json({message: 'No comment with this id!'});
        return;
    }
    const comment = commentData.get({ plain: true });
    const redir = '/api/post/' + comment.post_id;

    await Comment.destroy(
     {
       where: {
         id: req.params.id,
       },
     });
     res.status(200).redirect(redir);
   } catch (err) {
       res.status(500).json(err);
     };
 });


function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}


module.exports = router;
