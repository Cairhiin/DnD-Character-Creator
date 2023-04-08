import { ReactNode } from "react";
import styles from '@/styles/Layout.module.scss';

type Props = {
    children: ReactNode
};

const Layout = ({ children }: Props): JSX.Element => {
    return (
        <div>
            <main className={ styles.main }>
                { children }
            </main>
        </div>
    );
}

export default Layout;