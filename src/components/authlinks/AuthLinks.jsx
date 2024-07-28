'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import styles from './authlinks.module.css'
import { RiMenuLine, RiCloseLine} from '@remixicon/react'
import { signOut, useSession } from 'next-auth/react'

const AuthLinks = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { status } = useSession()

  return <>
    {status === 'unauthenticated' ? (
      <Link href="/login" className={styles.link}>Login</Link>
    ) : (
      <>
        <Link href="/write" className={styles.link}>Write</Link>
        <span className={styles.link} onClick={signOut}>Logout</span>
      </>
    )}
    <div className={styles.menuIcons} onClick = {toggleMenu}>
      {isMenuOpen ? <RiCloseLine/> : <RiMenuLine/>}
    </div>
    {isMenuOpen && (
      <div className={styles.responsiveMenu}>
        <Link href="/">Home</Link>
        <Link href="/">About</Link>
        <Link href="/">Contact</Link>
          {status === 'unauthenticated' ? (
            <Link href="/login">Login</Link>
            ) : (
              <>
                <Link href="/write">Write</Link>
                <span className={styles.link}>Logout</span>
              </>
        )}
      </div>
    )}
  </>
}

export default AuthLinks