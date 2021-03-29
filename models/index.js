const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.belongsToMany(Post, {
    // Define the third table needed to store the foreign keys
    through: {
      model: Post,
      unique: false
    },
    // Define an alias for when data is retrieved
    as: 'user_posts'
  });
  
Post.belongsToMany(Comment, {
    // Define the third table needed to store the foreign keys
    through: {
      model: Comment,
      unique: false
    },
    // Define an alias for when data is retrieved
    as: 'post_comments'
  });
  
  module.exports = { User, Post, Comment };
  