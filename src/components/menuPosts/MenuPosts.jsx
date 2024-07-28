import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import styles from './menuPosts.module.css';

const MenuPosts = ({withImage}) => {
  return (
    <div className={styles.items}>

        <Link href="/" className={styles.item}>
                { withImage && (<div className={styles.imageContainer}>
                    <Image src={"/p1.jpeg"} alt="" fill className={styles.image} />
                </div>)}
                <div className={styles.textContainer}>
                    <h3 className={`${styles.category} ${styles.style}`}>Tutorials</h3>
                    <p className={styles.desc}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                    <h3 className={styles.author}>
                        Kisibo Kevin
                        <span className={styles.date}>20.07.2024</span>
                    </h3>
                </div>
        </Link>

        <Link href="/" className={styles.item}>
            { withImage && (<div className={styles.imageContainer}>
                <Image src={"/p1.jpeg"} alt="" fill className={styles.image} />
            </div>)}
            <div className={styles.textContainer}>
                <h3 className={`${styles.category} ${styles.travel}`}>DevOps</h3>
                <p className={styles.desc}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <h3 className={styles.author}>
                    Kisibo Kevin
                    <span className={styles.date}>20.07.2024</span>
                </h3>
            </div>
        </Link>

        <Link href="/" className={styles.item}>
            { withImage && (<div className={styles.imageContainer}>
                <Image src={"/p1.jpeg"} alt="" fill className={styles.image} />
            </div>)}
            <div className={styles.textContainer}>
                <h3 className={`${styles.category} ${styles.culture}`}>Coding</h3>
                <p className={styles.desc}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <h3 className={styles.author}>
                    Kisibo Kevin
                    <span className={styles.date}>20.07.2024</span>
                </h3>
            </div>
        </Link>

        <Link href="/" className={styles.item}>
            { withImage && (<div className={styles.imageContainer}>
                <Image src={"/p1.jpeg"} alt="" fill className={styles.image} />
            </div>)}
            <div className={styles.textContainer}>
                <h3 className={`${styles.category} ${styles.coding}`}>News</h3>
                <p className={styles.desc}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <h3 className={styles.author}>
                    Kisibo Kevin
                    <span className={styles.date}>20.07.2024</span>
                </h3>
            </div>
        </Link>
    </div>
  );
}

export default MenuPosts