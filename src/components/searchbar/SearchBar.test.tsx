import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
  let mockSetSearchTerm: jest.Mock;

  beforeEach(() => {
    mockSetSearchTerm = jest.fn();
  });

  test("renders search input field", () => {
    render(<SearchBar searchTerm="" setSearchTerm={mockSetSearchTerm} />);

    const inputElement = screen.getByPlaceholderText("🔍 Search Pokemon...");
    expect(inputElement).toBeInTheDocument();
  });

  test("displays the correct placeholder", () => {
    render(<SearchBar searchTerm="" setSearchTerm={mockSetSearchTerm} />);
    
    const inputElement = screen.getByPlaceholderText("🔍 Search Pokemon...");
    expect(inputElement).toHaveAttribute("placeholder", "🔍 Search Pokemon...");
  });

  test("updates input value when user types", () => {
    render(<SearchBar searchTerm="" setSearchTerm={mockSetSearchTerm} />);

    const inputElement = screen.getByPlaceholderText("🔍 Search Pokemon...");
    
    fireEvent.change(inputElement, { target: { value: "pikachu" } });

    expect(mockSetSearchTerm).toHaveBeenCalledWith("pikachu");
  });

  test("handles empty input correctly", () => {
    render(<SearchBar searchTerm="charizard" setSearchTerm={mockSetSearchTerm} />);

    const inputElement = screen.getByPlaceholderText("🔍 Search Pokemon...");
    
    fireEvent.change(inputElement, { target: { value: "" } });

    expect(mockSetSearchTerm).toHaveBeenCalledWith("");
  });
});

export {};