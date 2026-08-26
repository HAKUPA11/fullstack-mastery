import styles from "./Header.module.css";

function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>
                React Store
            </h1>
        </header>
    );
}

export default Header;