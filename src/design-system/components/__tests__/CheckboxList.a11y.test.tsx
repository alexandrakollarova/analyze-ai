import React from "react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import CheckboxList from "../CheckboxList";

describe("CheckboxList a11y", () => {
  it("should have no accessibility violations", async () => {
    const options = [
      { value: "a", label: "Option A" },
      { value: "b", label: "Option B" },
    ];
    const { container } = render(
      <CheckboxList
        options={options}
        selected={["a"]}
        onChange={() => {}}
        name="Test List"
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
}); 