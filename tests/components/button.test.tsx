import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is disabled and shows spinner when loading", () => {
    render(<Button loading>Click me</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn.querySelector("svg")).toBeInTheDocument();
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Click me
      </Button>
    );
    await user.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders icon on the right by default", () => {
    render(<Button icon={<ArrowRight data-testid="icon" />}>Go</Button>);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("applies fullWidth class", () => {
    render(<Button fullWidth>Full</Button>);
    expect(screen.getByRole("button")).toHaveClass("w-full");
  });

  it.each([
    ["primary", "bg-brand-500"],
    ["secondary", "bg-white"],
    ["danger", "bg-red-500"],
    ["ghost", "text-slate-600"],
    ["outline", "border-brand-500"],
  ] as const)("variant %s has expected class", (variant, expectedClass) => {
    render(<Button variant={variant}>Btn</Button>);
    expect(screen.getByRole("button")).toHaveClass(expectedClass);
  });
});
