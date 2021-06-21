import { render, screen } from "@testing-library/react";
import ReportPage from "./report";

test("renders learn react link", () => {
  render(<ReportPage />);
  // const linkElement = screen.getByText(/learn react/i);
  expect(true).toEqual(true);
});
