import {
  getCreateLinkAction,
  CREATE_LINK_WITH_TEMP_ID,
} from "./GraphDataContextActions";

describe("getCreateLinkAction", () => {
  it("should fail", () => {
    let createLink = getCreateLinkAction({ type: CREATE_LINK_WITH_TEMP_ID });
  });
});
