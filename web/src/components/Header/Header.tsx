import styles from './styles.module.css'

import { RootState } from '../../store/store'
import { useSelector } from "react-redux"
import { useEffect, useRef } from 'react'
import React from 'react'

const Header = React.memo(function Header() {
    const user = useSelector((state: RootState) => state.user);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const headerHeight = headerRef.current?.offsetHeight || 0;
        document.querySelector(`.${styles.header}`);

        document.body.style.marginTop = `${headerHeight}px`;
    }, [])

    return (
        <header className={styles.header} ref={headerRef}>
            <div className={styles.companyInfo}>
                <h1> company </h1>
                <h2> Mobile Admin Portal </h2>
            </div>
            <div className={styles.userInfo}>
                <p> {user.name} </p>
                <p> {user.team} </p>
                <p> {user.role} </p>
            </div>
        </header>
    )
});

export default Header
