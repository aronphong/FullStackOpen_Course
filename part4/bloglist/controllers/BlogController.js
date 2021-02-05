const express = require("express");
const { response } = require("../app.js");
const blogRouter = express.Router();
const Blog = require("../models/Blog.js");
const User = require("../models/User");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.post("/", async (req, res) => {
  const { title, author, url, likes } = req.body;
  const user = await User.findById(body.userId);

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  });

  if (blog.likes === "undefined" || blog.likes === null) {
    blog.likes = 0;
  }

  if (
    blog.title === undefined ||
    blog.title === null ||
    blog.url === undefined ||
    blog.url === null
  ) {
    return res.status(400).end();
  } else {
    const result = await blog.save();
    user.blogs = user.blogs.concat(blog._id);
    await user.save();
    return res.status(201).json(result.toJSON());
  }
});

blogRouter.delete("/:id", async (req, res) => {
  if (!req.token || !req.decodeToken) {
    return res.status(401).json({ error: "token missing or invalid " });
  }

  try {
    if (blog.user.toString() === req.decodeToken.id.toString()) {
      await Blog.findByIdAndRemove(req.params.id);
      res.status(204).end();
    } else {
      res.status(400).end();
    }
  } catch (error) {
    res.status(400).end();
  }
});

blogsRouter.put("/:id", async (req, res) => {
  const blog = {
    likes: req.body.likes,
  };
  try {
    const result = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
    });
    res.json(result.toJSON());
  } catch (error) {
    res.status(400).end();
  }
});

module.exports = blogRouter;
