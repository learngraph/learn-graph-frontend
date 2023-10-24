import { Box, Button } from "@mui/material";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LoginForm from "./LoginForm";

enum TabNames {
  "LOGIN",
  "SIGNUP",
}

// TODO: grab the request and return types from the RPC I/O Types instead of redefining them here
export interface LoginRequestData {
  username: string;
  password: string;
}

export interface LoginRequestReturn {
  success: boolean;
  token?: string;
}

interface FormTabProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function FormTab(props: FormTabProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`form-tabpanel-${index}`}
      aria-labelledby={`form-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `form-tab-${index}`,
    "aria-controls": `form-tabpanel-${index}`,
  };
}

export default function LoginSignupMenu() {
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<TabNames>(TabNames.LOGIN);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleLoginSubmit = ({
    username,
    password,
  }: LoginRequestData): Promise<LoginRequestReturn> => {
    // TODO: write user management context with login RPC
    return Promise.resolve({ success: true });
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Login/Signup
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={selectedTab} onChange={handleSelectTab} centered>
              <Tab label="Login" {...a11yProps(0)}></Tab>
              <Tab label="Signup" {...a11yProps(0)}></Tab>
            </Tabs>
          </Box>
        </Box>
        <FormTab value={selectedTab} index={0}>
          <LoginForm onSubmit={handleLoginSubmit} />
        </FormTab>
        <FormTab value={selectedTab} index={1}>
          SignupForm
        </FormTab>
      </Dialog>
    </Box>
  );
}
