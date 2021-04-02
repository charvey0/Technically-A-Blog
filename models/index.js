const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const { post } = require('../controllers');

User.belongsToMany(Post);
Post.belongsTo(User);  
Post.hasMany(Comment);
Comment.hasOne(Post);


module.exports = { User, Post, Comment };
  