import { Box, Button } from "@mui/material";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LoginForm from "./LoginForm";
import { SignUpForm } from "./SignUpForm";
import {
  LoginResponse,
  UserSignupInfo,
} from "@src/GraphManager/RPCHooks/useCreateUser";
import { UserLoginInfo } from "@src/GraphManager/RPCHooks/useLoginUser";
import { useUserDataContext } from "@src/Context/UserDataContext";
import { useTranslation } from "react-i18next";
import { useUserDataBackendContext } from "@src/Context/UserDataBackendContext";
import i18n from "@src/i18n";

enum TabNames {
  "LOGIN",
  "SIGNUP",
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

  const handleSelectTab = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const { setUserID, setUserName, setAuthenticationToken } =
    useUserDataContext();
  const { backend } = useUserDataBackendContext();
  const loginUserInContext = (login: LoginResponse | undefined) => {
    if (login?.success) {
      const username = login.userName ?? "unknown";
      setUserID(login.userID);
      setUserName(username);
      setAuthenticationToken(login.token);
      console.log(
        `setting login info in context: username=${username} id=${login.userID}, token=${login.token}`,
      );
    } else {
      if (login?.message?.includes("EMail already exists:"))
        alert(i18n.t("sign up error: email already exists"));
      else if (login?.message?.includes("Username already exists"))
        alert(i18n.t("sign up error: username already exists"));
      else {
        alert(i18n.t("sign up error"));
        console.log(login?.message);
      }
    }
  };
  const handleLoginSubmit = async (userInput: UserLoginInfo) => {
    const rsp = await backend.loginUser(userInput);
    loginUserInContext(rsp.data?.login);
  };
  const handleSignUpSubmit = async (signup: UserSignupInfo) => {
    const rsp = await backend.createUserWithEMail(signup);
    loginUserInContext(rsp.data?.createUserWithEMail.login);
  };
  const { t } = useTranslation();
  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        {t("Login/Signup")}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={selectedTab} onChange={handleSelectTab} centered>
              <Tab label={t("Login")} {...a11yProps(0)}></Tab>
              <Tab label={t("Signup")} {...a11yProps(0)}></Tab>
            </Tabs>
          </Box>
        </Box>
        <FormTab value={selectedTab} index={0}>
          <LoginForm onSubmit={handleLoginSubmit} />
        </FormTab>
        <FormTab value={selectedTab} index={1}>
          <SignUpForm onSubmit={handleSignUpSubmit} />
        </FormTab>
      </Dialog>
    </Box>
  );
}
