import React from 'react';
import styles from '../styles/header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>turnoFacil</a>
    </header>
  );
}

export default Header;
