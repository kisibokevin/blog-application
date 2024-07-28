import React from 'react'
import styles from './footer.module.css'
import Image from 'next/image'
import Link from 'next/link';

export const Footer = () => {

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.logo}>
                    <Image src="/logo.png" alt="logo" width={50} height={50} />
                    <h1 className={styles.logoText}>Code Chronicles</h1>
                </div>
                <p className={styles.desc}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, iste
                    dolore magnam vel ipsa quidem obcaecati fugiat maiores voluptatem.
                    Architecto?
                </p>
                <div className={styles.icons}>
                    <Image src="/facebook.png" alt="" width={18} height={18} />
                    <Image src="/tiktok.png" alt="" width={18} height={18} />
                    <Image src="/instagram.png" alt="" width={18} height={18} />
                    <Image src="/youtube.png" alt="" width={18} height={18} />
                    
                </div>
            </div>
            <div className={styles.links}>
                <div className={styles.list}>
                    <span className={styles.listTitle}>Links</span>
                    <Link href="/">Home</Link>
                    <Link href="/">Blog</Link>
                    <Link href="/">About</Link>
                    <Link href="/">Contact</Link>
                </div>
                <div className={styles.list}>
                    <span className={styles.listTitle}>Tags</span>
                    <Link href="/">Guides</Link>
                    <Link href="/">Frontend</Link>
                    <Link href="/">Backend</Link>
                    <Link href="/">DevOps</Link>
                </div>
                <div className={styles.list}>
                    <span className={styles.listTitle}>Socials</span>
                    <Link href="/">Twitter</Link>
                    <Link href="/">Facebook</Link>
                    <Link href="/">Tiktok</Link>
                    <Link href="/">YouTube</Link>
                </div>
            </div>
        </div>
    );
}

export default Footer;
