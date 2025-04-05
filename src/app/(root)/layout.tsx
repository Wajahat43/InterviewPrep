interface AuthLayoutProps {
  children: React.ReactNode;
}

export const RootLayout = (props: AuthLayoutProps) => {
  const { children } = props;

  return <div>{children}</div>;
};

export default RootLayout;
