import { ReactNode } from "react";
import styles from "@/styles/Layout.module.scss";
import { Roboto_Condensed } from "next/font/google";

const roboto = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
});

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <main className={`${styles.layout} ${roboto.className}`}>{children}</main>
  );
};

export default Layout;
