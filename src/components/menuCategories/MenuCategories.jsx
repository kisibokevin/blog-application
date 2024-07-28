import Link from 'next/link';
import React from 'react'
import styles from './menuCategories.module.css'

const MenuCategories = () => {
    return (
        <div className={styles.categoryList}>
        <Link href="/" className={`${styles.category} ${styles.style}`}>
            Tutorials
        </Link>
        <Link href="/" className={`${styles.category} ${styles.fashion}`}>
            Frontend
        </Link>
        <Link href="/" className={`${styles.category} ${styles.food}`}>
            Backend
        </Link>
        <Link href="/" className={`${styles.category} ${styles.travel}`}>
            DevOps
        </Link>
        <Link href="/" className={`${styles.category} ${styles.culture}`}>
            Coding
        </Link>
        <Link href="/" className={`${styles.category} ${styles.coding}`}>
            News
        </Link>
        </div>
    );
}

export default MenuCategories