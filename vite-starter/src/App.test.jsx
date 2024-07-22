import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("button click flow", () => {
  render(<App />);

  // find an element with a role of button and text matching /blue/i
  const buttonElement = screen.getByRole("button", {
    name: /blue/i,
  });

  // expect the class to be red
  expect(buttonElement).toHaveClass("red");

  // click button
  fireEvent.click(buttonElement);

  // expect the class to be blue
  expect(buttonElement).toHaveClass("blue");

  // expect the button text to match /red/i
  expect(buttonElement).toHaveTextContent(/red/i);
});

test("disable button checkbox flow", () => {
  render(<App />);

  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });

  const buttonElement = screen.getByRole("button", {
    name: /blue/i,
  });

  expect(checkboxElement).not.toBeChecked();
  expect(buttonElement).toBeEnabled();

  fireEvent.click(checkboxElement);

  // expect(checkboxElement).toBeChecked();
  expect(buttonElement).not.toBeEnabled();

  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
});
