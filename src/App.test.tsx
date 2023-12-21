import { render, screen } from "@testing-library/react";
//import App from './App';

test("renders learn react link", () => {
  //render(<App />);
  render(
    <div>
      <h1>learn react</h1>
    </div>,
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
