import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import data from "./data";

const search = (getByTestId) => {
  const SearchBox = getByTestId("search-box");
  const SubmitBtn = getByTestId("search-btn");
  fireEvent.focus(SearchBox);
  fireEvent.change(SearchBox, { target: { value: "a" } });
  fireEvent.click(SubmitBtn);
};

test("Page Rendered", () => {
  const { getByText } = render(<App />);
  const Title = getByText(/Good reads/i);
  expect(Title).toBeInTheDocument();
});

test("Make search", () => {
  const { getByTestId } = render(<App />);
  search(getByTestId);
});

test("Checking loader", () => {
  const { getByText, getByTestId } = render(<App />);
  search(getByTestId);
  const Loader = getByText(/Loading .../i);
  expect(Loader).toBeInTheDocument();
});
test("Check book render", async () => {
  const { getByTestId } = render(<App />);
  const axios = require("axios");
  jest.mock("axios");
  await axios.get.mockResolvedValue(data);
  search(getByTestId);
  setTimeout(() => {
    const Loader = getByTestId("book-0");
    expect(Loader).toBeInTheDocument();
  }, 1000);
});
