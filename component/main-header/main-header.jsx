import React from 'react'
import logoImage from '@/assets/logo.png'
import Link from 'next/link'
import classes from "@/component/main-header/main-header.module.css";
import Image from 'next/image';
import MainHeaderBackground from '@/component/main-header/main-header-background';
import NavLink from './nav-link';

export default function Header() {
    return (
        <>
            <MainHeaderBackground />
            <header className={classes.header}>
                <Link href="/" className={classes.logo}>
                    <Image src={logoImage} alt='Logo' priority />
                </Link>

                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <NavLink href="/meals">Browse meals</NavLink>
                        </li>
                        <li>
                            <NavLink href="/community">Foodies Community</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}
