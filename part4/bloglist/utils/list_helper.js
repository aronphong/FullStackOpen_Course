const dummy = (blogs) => {
  // ...
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, current) => total + current.likes, 0);
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const index = likes.indexOf(Math.max(...likes));
  return blogs[index];
};

const mostBlogs = (blogs) => {
  let authors = blogs.map((blog) => blog.author);
  authors = [...new Set(authors)];

  let publications = new Array(authors.length).fill(0);
  blogs.map((blog) => (publications[authors.indexOf(blog.author)] += 1));

  let index = publications.indexOf(Math.max(...publications));

  return {
    author: authors[index],
    blogs: publications[index],
  };
};

const mostLikes = (blogs) => {
  let authors = blogs.map((blog) => blog.author);
  authors = [...new Set(authors)];

  let numLikes = new Array(authors.length).fill(0);
  blogs.map((blog) => (numLikes[authors.indexOf(blog.author)] += blog.likes));

  let index = numLikes.indexOf(Math.max(...numLikes));

  return {
    author: authors[index],
    likes: numLikes[index],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
