const router = require('express').Router();
const { Post, Comment } = require('../../models');



// route to get post by id
router.get('/:id', checkAuthenticated, async (req, res) => {
  try{ 
      const postData = await Post.findByPk(req.params.id);
      if(!postData) {
          res.status(404).json({message: 'No post with this id!'});
          return;
      }
      const post = postData.get({ plain: true });

      let owner = false;
      if (req.user.dataValues.id == post.user_id) {
          owner = true;
      }
      post.owner = owner;  

      const commentData = await Comment.findAll(
        {
          where: {
            post_id: req.params.id,
          },
        }        
      );

      const comments = commentData.map((comment) => comment.get({ plain: true }));

      comments.forEach( (comment) => {
        let owner = false;
        if (req.user.dataValues.id == comment.user_id) {
          owner = true;
        }
        comment.owner = owner;  
       }); 


      res.render('post', { post: post, comments: comments, layout: 'user' });
    } catch (err) {
        res.status(500).json(err);
    };     
});


// route to edit a post
router.get('/edit/:id', checkAuthenticated, async (req, res) => {
  //   {
  //     "title": "Post Number 1",
  //     "body": "Lorem ipsum dolor sit amet, consectetur.",
  //     "user_id": "1"
  // }
  
    try {
      const postData = await Post.findByPk(req.params.id);
      if(!postData) {
          res.status(404).json({message: 'No post with this id!'});
          return;
      }
      const post = postData.get({ plain: true });
      res.render('post-edit', { post: post, layout: 'user'  } );
    } catch (err) {
        res.status(500).json(err);
    };   

});


// route to edit a post
router.post('/edit/:id', checkAuthenticated, async (req, res) => {
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
    res.status(200).redirect('/dashboard');
  } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/delete/:id', checkAuthenticated, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if(!postData) {
        res.status(404).json({message: 'No post with this id!'});
        return;
    }
    const post = postData.get({ plain: true });
    res.render('post-delete', { post: post, layout: 'user' } );
  } catch (err) {
      res.status(500).json(err);
  }   
});

router.post('/delete/:id', checkAuthenticated, async (req, res) => {
  try {
     const comments = await Comment.findAll({
       where: {
         post_id: req.params.id,
       },
     });
     comments.forEach( async (comment) => {
         await Comment.destroy({
           where: {
             id: comment.id,
           },
         });      
     });
     const deletedPost = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).redirect('/dashboard');
  } catch (error) {
    res.status(500).json(error);  
  }
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.session) {
    return next();
  }
  res.redirect('/login');
}
  
module.exports = router;
