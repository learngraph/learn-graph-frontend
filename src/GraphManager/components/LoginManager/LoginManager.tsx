import LoginSignupMenu from "./LoginSignupMenu";
import UserDisplay from "./UserDisplay";

interface LoginManagerProps {}

export default function LoginManager(props: LoginManagerProps) {
  const userData = { isLoggedIn: false };
  if (userData.isLoggedIn) {
    return <UserDisplay />;
  }
  return <LoginSignupMenu />;
}
