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

test("checkbox flow", () => {
  // render app
  render(<App />);

  // find elements
  const buttonElement = screen.getByRole("button", {
    name: /blue/i,
  });
  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });

  // check initial conditions
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();

  // click checkbox to disable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass("gray");

  // click checkbox to re-enable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass("red");
});

test("checkbox flow after button click", () => {
  render(<App />);

  // find elements
  const buttonElement = screen.getByRole("button", {
    name: /blue/i,
  });
  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });

  // 초기
  expect(buttonElement).toHaveClass("red");
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();

  // checkbox 클릭 -> disable & 회색처리
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass("gray");

  // checkbox 클릭 -> enable 처리
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass("red");

  // 버튼 클릭 후 체크박스 클릭 -> disable 처리
  fireEvent.click(buttonElement);
  fireEvent.click(checkboxElement);
  expect(buttonElement).toHaveClass("gray");

  // 체크박스 클릭 후 -> enable 처리 및 색상 변경(파란색)
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass("blue");
});
