const Sequelize = require("sequelize");
const db = require('../database/db')
const comments = require('../models/comments')

const Post = db.sequelize.define(
  "posts", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    header: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    body: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    views: {
      type: Sequelize.INTEGER,
    },
    rating: {
      type: Sequelize.INTEGER,
    }
  },
  {
    timestamps: false
  }
)
module.exports = Post

Post.hasOne(comments, { onDelete: "cascade"})