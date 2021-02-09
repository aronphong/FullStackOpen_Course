import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blogs from "./Blog";
import axiosMock from "axios";

jest.mock("axios");

const blog = {
  title: "Full Stack Open 2021",
  author: "Aron Phong",
  url: "www.google.com",
  likes: 100,
  user: {
    username: "aronphong",
    name: "aron",
    id: "601dc6729c7aab0d9ed11add",
  },
};

test("renders content", () => {
  const component = render(<Blogs.Blog blog={blog} token={token} />);

  expect(component.container).toHaveTextContent(`${blog.title} ${blog.author}`);
});

test("clicking the element works", async () => {
  const component = render(<Blogs.Blog blog={blog} token={token} />);

  const element = component.getByText(`${blog.title} ${blog.author}`);
  fireEvent.click(element);

  expect(component.container).toHaveTextContent(
    `${blog.title} ${blog.author} ${blog.url} ${blog.likes} ${blog.user.name}`
  );
});

test("clicking like button works", async () => {
  const mockHandler = jest.fn();

  const component = render(
    <Blogs.Blog blog={blog} token={token} update={mockHandler} />
  );

  const element = component.getByText(`${blog.title} ${blog.author}`);
  fireEvent.click(element);

  const button = component.getByText("Like");
  axiosMock.put.mockResolvedValueOnce({ data: blog });
  fireEvent.click(button);
  axiosMock.put.mockResolvedValueOnce({ data: blog });
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

test("newBlog updates parent state and calls onSubmit works", async () => {
  const createBlog = jest.fn();

  const component = render(
    <Blogs.newBlog
      blogs={[]}
      token={token}
      setBlogs={createBlog}
      setDisplay={(value) => value}
    />
  );

  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");
  const form = component.container.querySelector("form");

  fireEvent.change(title, {
    target: { value: blog.title },
  });
  fireEvent.change(author, {
    target: { value: blog.author },
  });
  fireEvent.change(url, {
    target: { value: blog.url },
  });

  axiosMock.post.mockResolvedValueOnce({ status: 201, data: blog });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0][0].title).toBe(blog.title);
});
