import React from "react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import Drawer from "../Drawer";

describe("Drawer a11y", () => {
  it("should have no accessibility violations when open", async () => {
    const { container } = render(
      <Drawer open={true} onClose={() => {}} ariaLabel="Test Drawer">
        <div>Drawer Content</div>
      </Drawer>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("should not render when closed", () => {
    const { queryByText } = render(
      <Drawer open={false} onClose={() => {}} ariaLabel="Test Drawer">
        <div>Drawer Content</div>
      </Drawer>
    );
    expect(queryByText("Drawer Content")).toBeNull();
  });
}); 