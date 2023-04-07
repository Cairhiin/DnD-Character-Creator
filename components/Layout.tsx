import { ReactNode } from "react";
import styles from '../styles/Layout.module.scss';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

type Props = {
    children: ReactNode
};

const Layout = ({ children }: Props): JSX.Element => {
    return (
        <div className={ inter.className }>
            <main className={ styles.main }>
                { children }
            </main>
        </div>
    );
}

export default Layout;