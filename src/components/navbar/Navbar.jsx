import React from 'react'
import styles from './navbar.module.css'
import Image from 'next/image'
import Link from 'next/link';
import AuthLinks from '@/components/authlinks/AuthLinks';
import ThemeToggle from "@/components/themeToggle/ThemeToggle";

const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.socials}>
                <Image src="/facebook.png" alt="facebook" width={20} height={20} />
                <Image src="/instagram.png" alt="linkedin" width={20} height={20} />
                <Image src="/tiktok.png" alt="x" width={20} height={20} />
                <Image src="/youtube.png" alt="github" width={20} height={20} />
            </div>
            <div className={styles.logo}>Code Chronicles</div>
            <div className={styles.links}>
                <ThemeToggle/>
                <Link href="/" className={styles.link}>Home</Link>
                <Link href="/" className={styles.link}>About</Link>
                <Link href="/" className={styles.link}>Contact</Link>
                <AuthLinks />
            </div>
        </div>
    );
}

export default Navbar