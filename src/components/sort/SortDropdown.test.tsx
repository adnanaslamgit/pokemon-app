import { render, screen, fireEvent } from "@testing-library/react";
import SortDropdown from "./SortDropdown";

describe("SortDropdown Component", () => {
  let mockSetSortKey: jest.Mock;

  beforeEach(() => {
    mockSetSortKey = jest.fn();
  });

  test("renders the dropdown correctly", () => {
    render(<SortDropdown sortKey="name" setSortKey={mockSetSortKey} />);
    
    const dropdown = screen.getByRole("combobox");
    expect(dropdown).toBeInTheDocument();
  });

  test("has the correct default selected value", () => {
    render(<SortDropdown sortKey="name" setSortKey={mockSetSortKey} />);
    
    const dropdown = screen.getByRole("combobox");
    expect(dropdown).toHaveValue("name");
  });

  test("updates selected value when user changes option", () => {
    render(<SortDropdown sortKey="name" setSortKey={mockSetSortKey} />);
    
    const dropdown = screen.getByRole("combobox");

    fireEvent.change(dropdown, { target: { value: "height" } });

    expect(mockSetSortKey).toHaveBeenCalledWith("height");
  });

  test("calls setSortKey when a different option is selected", () => {
    render(<SortDropdown sortKey="name" setSortKey={mockSetSortKey} />);
    
    const dropdown = screen.getByRole("combobox");

    fireEvent.change(dropdown, { target: { value: "weight" } });

    expect(mockSetSortKey).toHaveBeenCalledWith("weight");
  });
});

export {};