import { ReactNode } from "react";
import Header from "./_components/header";
import Footer from "./_components/footer";

function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default PublicLayout;
