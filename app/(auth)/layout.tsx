import { ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }) {
  return <main>{children}</main>;
}

export default AuthLayout;
