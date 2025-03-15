import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  let mockSetOffset: jest.Mock;

  beforeEach(() => {
    mockSetOffset = jest.fn();
  });

  test("renders pagination buttons", () => {
    render(<Pagination limit={20} offset={0} setOffset={mockSetOffset} />);

    expect(screen.getByText("⬅️ Back")).toBeInTheDocument();
    expect(screen.getByText("Next ➡️")).toBeInTheDocument();
  });

  test('"Back" button is disabled when offset is 0', () => {
    render(<Pagination limit={20} offset={0} setOffset={mockSetOffset} />);

    expect(screen.getByText("⬅️ Back")).toBeDisabled();
  });

  test('"Next" button increases the offset', () => {
    render(<Pagination limit={20} offset={0} setOffset={mockSetOffset} />);

    fireEvent.click(screen.getByText("Next ➡️"));

    expect(mockSetOffset).toHaveBeenCalledWith(20);
  });

  test('"Back" button decreases the offset', () => {
    render(<Pagination limit={20} offset={20} setOffset={mockSetOffset} />);

    fireEvent.click(screen.getByText("⬅️ Back"));

    expect(mockSetOffset).toHaveBeenCalledWith(0);
  });

  test('"Back" button does not allow offset to go below 0', () => {
    render(<Pagination limit={20} offset={0} setOffset={mockSetOffset} />);

    fireEvent.click(screen.getByText("⬅️ Back"));

    expect(mockSetOffset).not.toHaveBeenCalled(); // Should not update offset
  });

  test('"Next" button allows further pagination', () => {
    render(<Pagination limit={20} offset={40} setOffset={mockSetOffset} />);

    fireEvent.click(screen.getByText("Next ➡️"));

    expect(mockSetOffset).toHaveBeenCalledWith(60);
  });
});

export {};