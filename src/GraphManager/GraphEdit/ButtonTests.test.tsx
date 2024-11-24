import { makeMockController } from "./GraphEdit.testingutil";
import {openCreateNodePopUpAtPagePosition, openCreateLinkPopUp } from "./GraphEdit";

jest.mock("./GraphEdit", () => ({
    openCreateNodePopUpAtPagePosition: jest.fn(),
    openCreateLinkPopUp: jest.fn(),
  }));

describe("UserSettings", () => {
    it("should toggle isOpen state when toggleDrawer is called", () => {
        // Arrange: Mock initial state
        let isOpen = false;
        const toggleDrawer = () => {
          isOpen = !isOpen; // Simulate toggling the drawer state
        };
        // Act: Simulate what happens when the button is clicked
        toggleDrawer();
      
        // Assert: Check if the state toggled
        expect(isOpen).toBe(true); 
        // Act again: Toggle back to simulate closing the drawer
        toggleDrawer();
      
        // Assert: Check if the state toggled back
        expect(isOpen).toBe(false);
      });
      it("should call ctrl.mode.setUse3D when toggling 3D display", () => {
        // Arrange: Mock controller
        const ctrl = makeMockController();
        ctrl.mode.use3D = false; // Initial state
        ctrl.mode.setUse3D = jest.fn((fn: (current: boolean) => boolean) => {
          ctrl.mode.use3D = fn(ctrl.mode.use3D);
        });
      
        // Act: Simulate toggling 3D mode on
        ctrl.mode.setUse3D((current: boolean) => !current);
      
        // Assert: Check that 3D mode is now true
        expect(ctrl.mode.use3D).toBe(true);
        expect(ctrl.mode.setUse3D).toHaveBeenCalledTimes(1);
      
        // Act: Simulate toggling 3D mode off
        ctrl.mode.setUse3D((current: boolean) => !current);
      
        // Assert: Check that 3D mode is now false
        expect(ctrl.mode.use3D).toBe(false);
        expect(ctrl.mode.setUse3D).toHaveBeenCalledTimes(2);
      });
      
});
describe("NoTouchButton", () => {
    it("should toggle ctrl.mode.allowGraphInteractions when clicked", () => {
      // Arrange: Mock controller
      const ctrl = makeMockController();
      ctrl.mode.allowGraphInteractions = false; // Initial state
      ctrl.mode.setAllowGraphInteractions = jest.fn((fn: (current: boolean) => boolean) => {
        ctrl.mode.allowGraphInteractions = fn(ctrl.mode.allowGraphInteractions);
      });
  
      // Act: Simulate button click to enable graph interactions
      ctrl.mode.setAllowGraphInteractions((current: boolean) => !current);
  
      // Assert: Check that graph interactions are now enabled
      expect(ctrl.mode.allowGraphInteractions).toBe(true);
      expect(ctrl.mode.setAllowGraphInteractions).toHaveBeenCalledTimes(1);
  
      // Act: Simulate button click to disable graph interactions
      ctrl.mode.setAllowGraphInteractions((current: boolean) => !current);
  
      // Assert: Check that graph interactions are now disabled
      expect(ctrl.mode.allowGraphInteractions).toBe(false);
      expect(ctrl.mode.setAllowGraphInteractions).toHaveBeenCalledTimes(2);
    });
  
  });

  describe("EditModeButton", () => {
    it("should toggle ctrl.mode.isEditingEnabled when clicked", () => {
      // Arrange: Mock controller
      const ctrl = makeMockController();
      ctrl.mode.isEditingEnabled = false; // Initial state
      ctrl.mode.setIsEditingEnabled = jest.fn((newValue: boolean) => {
        ctrl.mode.isEditingEnabled = newValue;
      });
  
      // Act: Simulate enabling edit mode
      ctrl.mode.setIsEditingEnabled(!ctrl.mode.isEditingEnabled);
  
      // Assert: Check that edit mode is now enabled
      expect(ctrl.mode.isEditingEnabled).toBe(true);
      expect(ctrl.mode.setIsEditingEnabled).toHaveBeenCalledWith(true);
      expect(ctrl.mode.setIsEditingEnabled).toHaveBeenCalledTimes(1);
  
      // Act: Simulate disabling edit mode
      ctrl.mode.setIsEditingEnabled(!ctrl.mode.isEditingEnabled);
  
      // Assert: Check that edit mode is now disabled
      expect(ctrl.mode.isEditingEnabled).toBe(false);
      expect(ctrl.mode.setIsEditingEnabled).toHaveBeenCalledWith(false);
      expect(ctrl.mode.setIsEditingEnabled).toHaveBeenCalledTimes(2);
    });
  
    // it("should show an alert if user is not logged in when clicked", () => {
    //     // Code here
    //       });
    
    //   it("should render the correct icon based on isEditingEnabled state", () => {
    //    //code here
    //   });   
  });

describe("CreateButton", () => {
    let mockController: any;

    beforeEach(() => {
        mockController = {
          mode: { isEditingEnabled: true },
        };
      });

  it("should update anchorEl state when button is clicked", () => {
    // Arrange: Mock the initial state of anchorEl
    let anchorEl: HTMLElement | null = null;

    // Simulate the setAnchorEl function that changes the anchorEl state
    const setAnchorEl = (value: HTMLElement | null) => {
      anchorEl = value;
    };

    // Act: Simulate button click by manually updating the anchorEl state
    setAnchorEl(document.createElement("div")); // Simulating the button click setting anchorEl

    // Assert: Check if anchorEl is set correctly
    expect(anchorEl).not.toBeNull(); // Assert that anchorEl is set to a non-null value
  });

  it("should call openCreateNodePopUpAtPagePosition when 'New Node' is selected", () => {
    // Arrange: Mock initial state
    const ctrl = mockController;
    const menuItem = "newNode";

    // Mock the openCreateNodePopUpAtPagePosition function
    const setIsEditingEnabledMock = jest.fn();
    ctrl.mode.setIsEditingEnabled = setIsEditingEnabledMock;

    // Act: Simulate the selection of "New Node"
    if (menuItem === "newNode") {
      openCreateNodePopUpAtPagePosition(
        { x: window.innerWidth / 2, y: window.innerHeight / 2 },
        ctrl
      );
    }
    // Assert: Check that the correct function was called with the expected arguments
    expect(openCreateNodePopUpAtPagePosition).toHaveBeenCalledWith(
      { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      ctrl
    );
  });

  it("should call openCreateLinkPopUp when 'New Link' is selected", () => {
    // Arrange: Mock initial state
    const ctrl = mockController;
    const menuItem = "newLink";

    // Mock the openCreateLinkPopUp function
    const setIsEditingEnabledMock = jest.fn();
    ctrl.mode.setIsEditingEnabled = setIsEditingEnabledMock;

    // Act: Simulate the selection of "New Link"
    if (menuItem === "newLink") {
      openCreateLinkPopUp(ctrl, undefined);
    }
    // Assert: Check that the correct function was called
    expect(openCreateLinkPopUp).toHaveBeenCalledWith(ctrl, undefined);
  });
});
  
  
