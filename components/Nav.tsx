import styles from '@/styles/Nav.module.scss';

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>
                <h1>
                    D<span className={styles.secondaryColor__highlight}>&</span>D Character 
                    <span className={styles.secondaryColor__highlight}>Manager</span>
                </h1>
            </div>
            <div className={styles.auth}>
                <ul>
                    <li>Log in</li>
                    <li>Register</li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;