import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notifcation";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Toggable from "./components/Toggable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = React.createRef();

  useEffect(async () => {
    const getBlogs = await blogService.getAll();
    setBlogs(getBlogs);
  }, []);

  useEffect(async () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    console.log(loggedUserJSON);
    if (loggedUserJSON) {
      const user = await JSON.parse(loggedUserJSON);
      await setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("Wrong Credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    try {
      localStorage.removeItem("token");
      window.localStorage.removeItem("loggedBlogUser");

      setUser(null);
    } catch (error) {
      setErrorMessage("Error logging out");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility();
    blogService.addBlog(newBlog);
    setBlogs(blogs.concat(newBlog));
    setErrorMessage(" New blog added");
  };

  const handleLikeBlog = (blogObject) => {
    blogService.likeblog(blogObject);
    const updatedBlog = {
      ...blogObject,
      likes: blogObject.likes + 1,
    };
    return updatedBlog;
  };

  const handleDeleteBlog = (blogObject) => {
    return blogService.deleteBlog(blogObject);
  };

  const loginForm = () => (
    <Toggable buttonLabel='login'>
      <LoginForm
        handleLogin={handleLogin}
        setUsername={setUsername}
        setPassword={setPassword}
        username={username}
        password={password}
      />
    </Toggable>
  );

  const blogForm = () => (
    <Toggable buttonLabel='new-blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Toggable>
  );

  {
    console.log(user);
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <form onSubmit={handleLogout}>
            <p>{user.name} is logged in</p>
            <button>Logout</button>
          </form>
          {blogForm()}
        </div>
      )}

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikeBlog={handleLikeBlog}
          handleDeleteBlog={handleDeleteBlog}
        />
      ))}
    </div>
  );
};

export default App;
