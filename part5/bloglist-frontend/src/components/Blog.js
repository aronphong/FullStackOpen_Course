/* eslint-disable linebreak-style */
import Toggable from "../components/Toggable";
import React from "react";

const Blog = ({ blog, handleLikeBlog, handleDeleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Toggable buttonLabel='view'>
        Likes: {blog.likes}{" "}
        <button onClick={() => handleLikeBlog(blog)}>Like</button>
        {blog.url}
        <button onClick={() => handleDeleteBlog(blog)}>Remove</button>
      </Toggable>
    </div>
  );
};

export default Blog;
