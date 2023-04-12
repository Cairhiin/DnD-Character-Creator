import Link from 'next/link';
import styles from '@/styles/Nav.module.scss';
import { Inter } from 'next/font/google';
import { useSession, signOut } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] });

const Nav = (): JSX.Element => {
    const { data: session, status } = useSession();
    const isLoggedIn = status === "authenticated";
    return (
        <nav className={`${styles.nav} ${inter.className}`}>
            <div className={styles.logo}>
                <h1>
                    D<span className={styles.secondaryColor__highlight}>&</span>D Character 
                    <span className={styles.secondaryColor__highlight}>Manager</span>
                </h1>
            </div>
            <div className={styles.auth}>
                <ul>
                    { isLoggedIn 
                        ?
                            <>
                                <li>Settings</li>
                                <li onClick={() => signOut()}>Logout</li>
                            </>
                        :
                            <>
                                <li><Link href='/auth/login'>Log in</Link></li>
                                <li><Link href='/auth/register'>Register</Link></li>
                            </>
                    }
                </ul>
            </div>
        </nav>
    );
}

export default Nav;