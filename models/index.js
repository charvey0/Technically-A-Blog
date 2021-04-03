const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User.belongsToMany(Post);
// Post.belongsTo(User);  
// Post.hasMany(Comment);
// Comment.hasOne(Post);

// Post.belongsTo(User, {onDelete: 'CASCADE'});  
// Post.hasMany(Comment, {onDelete: 'CASCADE'});
// Comment.hasOne(Post, {onDelete: 'CASCADE'});


module.exports = { User, Post, Comment };
  