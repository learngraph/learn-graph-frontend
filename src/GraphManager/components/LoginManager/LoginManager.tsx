import { useUserDataContext } from "src/UserDataContext";
import LoginSignupMenu from "./LoginSignupMenu";
import UserDisplay from "./UserDisplay";

export default function LoginManager() {
  const { userID, userName } = useUserDataContext();
  if (userID !== "") {
    return <UserDisplay userID={userID} userName={userName} />;
  }
  return <LoginSignupMenu />;
}
