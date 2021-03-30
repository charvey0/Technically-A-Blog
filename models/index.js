const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, { foreignKey: 'id', as: "user_id" });
  
Comment.belongsTo(Post, { foreignKey: 'id', as: "post_id" });  

module.exports = { User, Post, Comment };
  