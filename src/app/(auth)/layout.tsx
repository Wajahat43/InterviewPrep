interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = (props: AuthLayoutProps) => {
  const { children } = props;

  return <div className="auth-layout">{children}</div>;
};

export default AuthLayout;
