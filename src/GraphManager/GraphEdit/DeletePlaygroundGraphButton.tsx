import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { CircleContainer, buttonIconStyle } from "./CreateButton"; // Reusing the existing styles
import { Controller } from "./GraphEdit";

const LOCAL_STORAGE_KEY = "playgroundGraph";

export const DeletePlaygroundGraphButton = (props: { ctrl: Controller }) => {
  // Function to delete playground data from localStorage
  const handleDelete = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    props.ctrl.graph.current.links.forEach((link) =>
      props.ctrl.graph.removeLink(link),
    );
    props.ctrl.graph.current.nodes.forEach((node) =>
      props.ctrl.graph.removeNode(node),
    );
    alert("Playground data discarded");
  };

  return (
    <Tooltip title="Discard playground data">
      <Button onClick={handleDelete}>
        <CircleContainer>
          <DeleteIcon style={buttonIconStyle} />
        </CircleContainer>
      </Button>
    </Tooltip>
  );
};
