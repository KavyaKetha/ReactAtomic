import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  test("renders learn react link", () => {
    render(<App />);
    const linkElement = screen.getByText(/Welcome to My React App/i);
    expect(linkElement).toBeInTheDocument();
  });
});
