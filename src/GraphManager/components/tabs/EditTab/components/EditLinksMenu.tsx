import { useState } from "react";
import { LinkType, NodeType } from "../../../../types";
import { List, Button, Typography } from "@mui/material";
import { LinkDisplay } from "./LinkDisplay";
import { EditLinkMenu } from "./EditLinkMenu";
import { EditNodeMenu } from "./EditNodeMenu";

type EditLinksMenuProps = {
  forwardLinks: LinkType[];
  backwardLinks: LinkType[];
  onUpdateLink: Function;
  nodes: NodeType[] | undefined;
  onUpdateNode: Function;
};

export const EditLinksMenu = ({
  forwardLinks,
  backwardLinks,
  onUpdateLink,
  nodes,
  onUpdateNode,
}: EditLinksMenuProps): JSX.Element => {
  const [isAddingNewLink, setIsAddingNewLink] = useState(false);
  const [isAddingNewNode, setIsAddingNewNode] = useState(false);
  const [currentNodeName, setCurrentNodeName] = useState("");
  const handleAddNewNode = ({ ...props }): void => {
    onUpdateNode({ isNewNode: true, ...props });
  };

  return (
    <>
      <Typography variant="h6">This node requires understanding of</Typography>
      <List component="nav">
        {forwardLinks.map((link) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <LinkDisplay
              link={link}
              onUpdateLink={onUpdateLink}
              nodes={nodes}
              key={`${link.source} -> ${link.target}`}
            />
          );
        }) ?? "none"}
      </List>
      <Typography variant="h6">This node is required to understand</Typography>
      <List component="nav">
        {backwardLinks.map((link) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <LinkDisplay
              link={link}
              onUpdateLink={onUpdateLink}
              nodes={nodes}
              key={`${link.source} -> ${link.target}`}
            />
          );
        }) ?? "none"}
      </List>
      {isAddingNewLink ? (
        <EditLinkMenu
          onUpdateLink={onUpdateLink}
          nodes={nodes}
          toggleIsEditable={setIsAddingNewLink}
          link={undefined}
        />
      ) : (
        <Button onClick={(): void => setIsAddingNewLink(true)}>
          Add new Link
        </Button>
      )}
      {isAddingNewNode ? (
        <EditNodeMenu
          node={undefined}
          currentText={currentNodeName}
          updateText={setCurrentNodeName}
          saveChanges={handleAddNewNode}
          finishEditing={(): void => setIsAddingNewNode(false)}
        />
      ) : (
        <Button onClick={(): void => setIsAddingNewNode(true)}>
          Add new Node
        </Button>
      )}
    </>
  );
};
