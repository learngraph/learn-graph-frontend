import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import i18n from "@src/shared/i18n";
import { useUserDataContext } from "@src/Context/UserDataContext";
import { useUserDataBackendContext } from "@src/Context/UserDataBackendContext";

interface UserDisplayProps {
  userID: string;
  userName: string;
}

export default function UserDisplay(props: UserDisplayProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { logout: logoutUserInContext } = useUserDataContext();
  const { backend } = useUserDataBackendContext();

  const handleLogout = async () => {
    setAnchorEl(null);
    try {
      await backend.logoutUser();
    } catch (e) {
      console.log(`logout failed! ${e}`);
    }
    logoutUserInContext();
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<PersonIcon 
          sx={{color:"white", background:"none"}}
        />}
        sx={{backgroundColor:"transparent",
             border:"1px solid white",
             borderRadius:"6px"

        }}
        onClick={handleClick}
        aria-label="user menu"
      >
        {props.userName}
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
    </>
  );
}
