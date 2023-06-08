import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/Nav.module.scss";
import { Inter } from "next/font/google";
import { useSession, signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

const Nav = (): JSX.Element => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  return (
    <nav className={`${styles.nav} ${inter.className}`}>
      <div className={styles.nav__left}>
        <div className={styles.logo}>
          <h1>
            D<span className={styles.secondaryColor__highlight}>&</span>D
            Character
            <span className={styles.secondaryColor__highlight}>Manager</span>
          </h1>
        </div>
        <div className={styles.menu}>
          <ul>
            <li
              className={router.pathname === "/create" ? "active-nav-link" : ""}
            >
              <Link href="/create">Create</Link>
            </li>
            <li
              className={router.pathname === "/manage" ? "active-nav-link" : ""}
            >
              <Link href="/manage">Manage</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.auth}>
        <ul>
          {isLoggedIn ? (
            <>
              <li
                className={
                  router.pathname === "/dashboard" ? "active-nav-link" : ""
                }
              >
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li
                className={
                  router.pathname === "/auth/profile" ? "active-nav-link" : ""
                }
              >
                <Link href="/auth/profile">Settings</Link>
              </li>
              <li onClick={() => signOut()}>Logout</li>
            </>
          ) : (
            <>
              <li
                className={
                  router.pathname === "/auth/login" ? "active-nav-link" : ""
                }
              >
                <Link href="/auth/login">Log in</Link>
              </li>
              <li
                className={
                  router.pathname === "/auth/register" ? "active-nav-link" : ""
                }
              >
                <Link href="/auth/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
