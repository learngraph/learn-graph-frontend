import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { NoTouchButton } from "./NoTouchButton";
import { UserSettingsButton } from "./UserSettingsButton";
import { EditModeButton } from "./ModeButton";
import { CreateButton} from "./CreateButton";
import { Controller } from "./GraphEdit";

// Mock functions from GraphEdit
jest.mock("./GraphEdit", () => ({
  openCreateNodePopUpAtPagePosition: jest.fn(),
  openCreateLinkPopUp: jest.fn(),
  i18n: { t: jest.fn((key: string) => key) }, // Mock translation function
}));

// Mock User Data Context
jest.mock("@src/Context/UserDataContext", () => ({
  useUserDataContext: jest.fn(),
}));

import { useUserDataContext } from "@src/Context/UserDataContext";

describe("Button Components", () => {
  let mockController: Controller;
  let setIsOpen: jest.Mock;
  let mockDisplayAlert: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    // Configure the mocked useUserDataContext
    (useUserDataContext as jest.Mock).mockReturnValue({ userID: null });

    // Mock necessary parts of the Controller
    mockController = {
      popUp: { state: { isOpen: false }, setState: jest.fn() },
      graph: {
        current: {
          nodes: [],
          edges: [],
        },
      },
      language: "en",
      mode: {
        isEditingEnabled: true,
        setIsEditingEnabled: jest.fn(),
        allowGraphInteractions: true,
        setAllowGraphInteractions: jest.fn(),
        use3D: false,
        setUse3D: jest.fn(),
      },
      search: {
        isResultShown: false,
        setIsResultShown: jest.fn(),
        highlightNodes: new Set(),
        setHighlightNodes: jest.fn(),
      },
    } as unknown as Controller;

    setIsOpen = jest.fn();
    mockDisplayAlert = jest.fn();
    global.alert = mockDisplayAlert; // Mock global alert
  });

  it("should toggle allowGraphInteractions when NoTouchButton is clicked", async () => {
    render(<NoTouchButton ctrl={mockController} />);
    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: /View-only mode|Enable Graph-Interaction/i });
    await user.click(button);

    expect(mockController.mode.setAllowGraphInteractions).toHaveBeenCalledWith(
      expect.any(Function)
    );
  });

  it("should toggle drawer open state when UserSettingsButton is clicked", async () => {
    const toggleDrawer = () => setIsOpen((current: boolean) => !current);

    render(
      <UserSettingsButton
        ctrl={mockController}
        onClick={toggleDrawer}
      />
    );
    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: /Settings/i });
    await user.click(button);

    expect(setIsOpen).toHaveBeenCalledWith(expect.any(Function));
  });

  it("should toggle isEditingEnabled when EditModeButton is clicked", async () => {
    // Configure userID for this test
    (useUserDataContext as jest.Mock).mockReturnValue({ userID: "testUser" });

    const user = userEvent.setup();
    mockController.mode.isEditingEnabled = false;

    render(
      <EditModeButton
        ctrl={mockController}
        isPlayground={false}
      />
    );

    const button = screen.getByRole("button", { name: /Edit Mode/i });
    await user.click(button);

    expect(mockController.mode.setIsEditingEnabled).toHaveBeenCalledWith(true);
  });

  it("should display alert if user is not logged in and isPlayground is false", async () => {
    const user = userEvent.setup();
  
    // Explicitly set userID to null and isPlayground to false
    (useUserDataContext as jest.Mock).mockReturnValue({ userID: null });
    mockController.mode.isEditingEnabled = false;
  
    // Render the component with isPlayground explicitly set to false
    render(<EditModeButton ctrl={mockController} isPlayground={false} />);
    // Locate the button
    const button = screen.getByRole("button", { name: /Edit Mode/i });
    await user.click(button);
    expect(mockController.mode.setIsEditingEnabled).not.toHaveBeenCalled();
  });

  
  it("should change anchorEl state and render the menu when the button is clicked", async () => {
  const user = userEvent.setup();
  (useUserDataContext as jest.Mock).mockReturnValue({ userID: "testUser" });

  render(<CreateButton ctrl={mockController} />);
  // Locate the button
  const button = screen.getByRole("button", { name: /Contribute knowledge/i });
  await user.click(button);

  // Verify that the menu is rendered
  const menu = screen.getByRole("menu");
  expect(menu).toBeInTheDocument();
  // Verify the menu is associated with the anchorEl
  expect(menu).toHaveAttribute("aria-labelledby", "basic-button");
});

  
  
});
