const router = require('express').Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');
const passport = require('passport');


//const Post = require('./models/Post');
// route to get all posts
router.get('/', async (req, res) => {
  const postData = await Post.findAll(
    // { include: Comment,
    //   required: true
    // }
  ).catch((err) => { 
//    console.log(postData);
      res.json(err);
    });
    const posts = postData.map((post) => post.get({ plain: true }));
      res.render('all', { posts });
});


router.get('/login', async (req, res) => {
  res.render('login');
});

router.get('/register', async (req, res) => {
      res.render('register');
});

router.get('/dashboard', checkAuthenticated, async (req, res) => {
  const postData = await Post.findAll(
//          { include: Comment }
       ).catch((err) => { 
          res.json(err);
        });
        const posts = postData.map((post) => post.get({ plain: true }));
          res.render('dashboard', { posts: posts, layout: 'user'  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));

// route to create/add a post
router.post('/register', async (req, res) => {
    try {
         const hash = await bcrypt.hash(req.body.password, 10);

         const userData = await User.create({email: req.body.email, hash: hash});
         res.status(200).redirect("/login");
         // go to the home page
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong!");
    }
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;