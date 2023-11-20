import { Box, Button } from "@mui/material";

interface UserDisplayProps {
  userID: string;
  userName: string;
}

export default function UserDisplay(props: UserDisplayProps) {
  const onClick = () => {};
  return (
    <Box>
      <Button variant="contained" color="primary" onClick={onClick}>
        User: {props.userName}
      </Button>
    </Box>
  );
}

// TODO(skep): can implement logout/deleteAccount here
//<Dialog open={open} onClose={handleClose}>
//<Box sx={{ width: "100%" }}>
//    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//    <Tabs value={selectedTab} onChange={handleSelectTab} centered>
//        <Tab label="Login" {...a11yProps(0)}></Tab>
//        <Tab label="Signup" {...a11yProps(0)}></Tab>
//    </Tabs>
//    </Box>
//</Box>
//<FormTab value={selectedTab} index={0}>
//    <LoginForm onSubmit={handleLoginSubmit} />
//</FormTab>
//<FormTab value={selectedTab} index={1}>
//    <SignUpForm onSubmit={handleSignUpSubmit} />
//</FormTab>
//</Dialog>
