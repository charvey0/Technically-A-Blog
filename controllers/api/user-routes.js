const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../../models/User');


router.get('/login', async (req, res) => {
    res.render('login');
});

router.get('/register', async (req, res) => {
        res.render('register');
});

router.post('/login', async (req, res) => {
    try{ 
       const password = req.body.password;
       const userData = await User.findOne({ where: { email: req.body.email } }); 
  
       if(userData) {
             const validPass = await bcrypt.compare(password, userData.hash);
             if(validPass) {
  
                 res.status(200).json(userData);
                 // go to the home page
             } else {
                 res.status(400).send("Unable to login!")
             }
       } else {
           res.status(400).send("Unable to login!")
       }
      } catch (err) {
          res.status(500).json(err);
      };     
  });
  
  // route to create/add a post
router.post('/register', async (req, res) => {
      try {
           const hash = await bcrypt.hash(req.body.password, 10);
  
           const userData = await User.create({email: req.body.email, hash: hash});
           res.status(200).redirect("/");
           // go to the home page
      } catch (err) {
          console.log(err);
          res.status(500).send("Something went wrong!");
      }
  });

module.exports = router;
