const router = require('express').Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');
const passport = require('passport');
const bcrypt = require('bcrypt');


// route to get all posts
router.get('/', async (req, res) => {
  const postData = await Post.findAll()
  .catch((err) => { 
      res.json(err);
    });
    const posts = postData.map((post) => post.get({ plain: true }));
      res.render('all', { posts });
});

router.get('/home', async (req, res) => {
  const postData = await Post.findAll()
  .catch((err) => { 
      res.json(err);
    });
    const posts = postData.map((post) => post.get({ plain: true }));
      res.render('all', { posts: posts, layout: 'user' });
});

router.get('/login', async (req, res) => {
  res.render('login');
});

router.get('/register', async (req, res) => {
      res.render('register');
});

router.get('/dashboard', checkAuthenticated, async (req, res) => {
  const postData = await Post.findAll(
      { where: 
        {user_id: req.user.dataValues.id}
      }
       ).catch((err) => { 
          res.json(err);
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        posts.forEach( (post) => {
          let owner = false;
          if (req.user.dataValues.id == post.user_id) {
            owner = true;
          }
          post.owner = owner;  
         }); 
          res.render('dashboard', { posts: posts, layout: 'user'  });
});















// route to create/add a post
router.post('/create', checkAuthenticated, async (req, res) => {
  try { 
    const id = req.user.dataValues.id;
    const userData = await User.findByPk(id);
    const user = userData.get({ plain: true });
    const username = user.username;
    const postData = await Post.create({
      title: req.body.title,
      body: req.body.body,
      user_id: id,
      username: username,
    });
    res.status(200).redirect('/dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/create', checkAuthenticated, async (req, res) => {
  res.render('post-add', { layout: 'user' } );
});













router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


// route to create/add a user
router.post('/register', async (req, res) => {
    try {
         const hash = await bcrypt.hash(req.body.password, 10);

         const userData = await User.create({email: req.body.email, hash: hash, username: req.body.username});
         res.status(200).redirect("/login");
         // go to the home page
    } catch (err) {
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