import React from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import i18n from "src/i18n";
import { useGraphDataContext } from "src/GraphDataContext";
import { useUserDataContext } from "src/UserDataContext";

interface UserDisplayProps {
  userID: string;
  userName: string;
}

export default function UserDisplay(props: UserDisplayProps) {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { logoutUser } = useGraphDataContext();
  const { setUserID, setUserName, setAuthenticationToken } =
    useUserDataContext();

  const logoutUserInContext = () => {
    setUserID("");
    setUserName("");
    setAuthenticationToken("");
    console.log(`successfully logged out user!`);
  };

  const handleLogout = async () => {
    setAnchorEl(null);
    try {
      await logoutUser();
    } catch (e) {
      console.log(`logout failed! ${e}`);
    }
    logoutUserInContext();
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        aria-label="user menu"
      >
        {t("user-name-button", { userName: props.userName })}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "user menu",
        }}
      >
        <MenuItem onClick={() => handleLogout()}>
          {i18n.t("logout-button")}
        </MenuItem>
      </Menu>
    </Box>
  );
}
