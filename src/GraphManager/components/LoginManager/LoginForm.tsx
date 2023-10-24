import { LoginRequestData, LoginRequestReturn } from "./LoginSignupMenu";

interface LoginFormProps {
  onSubmit: (data: LoginRequestData) => Promise<LoginRequestReturn>;
}

export default function LoginForm(props: LoginFormProps) {
  return <div>I'm a login form!</div>;
}
