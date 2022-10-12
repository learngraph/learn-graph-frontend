import { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { LinkType, NodeType } from "GraphManager/types";
import { EditLinkMenu } from "./EditLinkMenu";

type LinkDisplayProps = {
  link: LinkType;
  onUpdateLink: Function;
  nodes: NodeType[] | undefined;
};

export const LinkDisplay = ({
  link,
  onUpdateLink,
  nodes,
}: LinkDisplayProps): JSX.Element => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const { source, target, value, note } = link;

  if (isEditable) {
    return (
      <ListItem>
        <EditLinkMenu
          link={link}
          toggleIsEditable={setIsEditable}
          onUpdateLink={onUpdateLink}
          nodes={nodes}
        />
      </ListItem>
    );
  }
  return (
    <ListItem button onClick={(): void => setIsEditable(true)}>
      <ListItemText
        primary={`${source} --> ${target} (value: ${value})${
          note ? " (note: " + note + ")" : ""
        }`}
      />
    </ListItem>
  );
};
