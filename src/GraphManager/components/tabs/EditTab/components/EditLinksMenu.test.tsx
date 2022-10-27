import { EditLinksMenu } from "./EditLinksMenu";
import { render } from "@testing-library/react";

describe("EditLinksMenu", () => {
  it("should TODO", () => {
    let [onUpdateLink, onUpdateNode] = [jest.fn(), jest.fn()];
    render(<EditLinksMenu 
      forwardLinks={[]}
      backwardLinks={[]}
      onUpdateLink={onUpdateLink}
      nodes={[]}
      onUpdateNode={onUpdateNode}
    />);
    // TODO(skep): TEST ALL THE THINGS!!11
    expect(1).toBe(1);
  });
});
