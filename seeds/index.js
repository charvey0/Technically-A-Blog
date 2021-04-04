const sequelize = require('../config/connection');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

const commentData = require('./comment-seeds.json');
const postData = require('./post-seeds.json');
const userData = require('./user-seeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  
  await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
