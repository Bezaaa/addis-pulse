import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "@/components/ui/input";

describe("Input", () => {
  it("renders with label", () => {
    render(<Input label="Email" type="email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("shows error message with role=alert", () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid email");
  });

  it("adds aria-invalid when error is present", () => {
    render(<Input label="Email" error="Required" />);
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
  });

  it("shows hint when no error", () => {
    render(<Input label="Name" hint="Enter your full name" />);
    expect(screen.getByText("Enter your full name")).toBeInTheDocument();
  });

  it("hides hint when error is present", () => {
    render(<Input label="Name" hint="Enter your full name" error="Required" />);
    expect(screen.queryByText("Enter your full name")).not.toBeInTheDocument();
  });

  it("renders suffix node", () => {
    render(<Input label="Password" suffix={<span data-testid="suffix">👁</span>} />);
    expect(screen.getByTestId("suffix")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Input label="Email" disabled />);
    expect(screen.getByLabelText("Email")).toBeDisabled();
  });

  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<Input label="Name" />);
    const input = screen.getByLabelText("Name");
    await user.type(input, "Abebe");
    expect(input).toHaveValue("Abebe");
  });

  it("links label to input via auto-generated id", () => {
    render(<Input label="Search" />);
    const input = screen.getByLabelText("Search");
    expect(input.id).toBeTruthy();
  });
});
