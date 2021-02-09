import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ author: "", title: "", url: "" });

  const handleAuthorChange = (event) => {
    setNewBlog({ ...newBlog, author: event.target.value });
  };

  const handleTitleChange = (event) => {
    setNewBlog({ ...newBlog, title: event.target.value });
  };

  const handleUrlChange = (event) => {
    setNewBlog({ ...newBlog, url: event.target.value });
  };

  const addBlog = (event) => {
    event.preventDefault();
    createBlog(newBlog);
    setNewBlog({ author: "", title: "", url: "" });
  };

  return (
    <>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        Title:{" "}
        <input
          type='text'
          value={newBlog.author}
          onChange={handleAuthorChange}
        />
        Author:{" "}
        <input type='text' value={newBlog.title} onChange={handleTitleChange} />
        URL:{" "}
        <input type='text' value={newBlog.url} onChange={handleUrlChange} />
        <button type='submit'>save</button>
      </form>
    </>
  );
};

export default BlogForm;
