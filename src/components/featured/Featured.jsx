import React from 'react';
import styles from './featured.module.css';
import Image from 'next/image';


const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b className={styles.bold}>Welcome to Code Chronicles: </b>Your Ultimate Guide to Web Development and
        Tech Innovations
      </h1>
      <div className={styles.post}>
        <div className={styles.imageContainer}>
          <Image src="/p1.jpeg" alt="" fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h1>
          <p className={styles.postDesc}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. In tempore saepe ex impedit, provident architecto tenetur repudiandae repellat voluptatibus totam adipisci porro excepturi quae fugit earum fuga a. Quas, eaque?
          </p>
          <button className={styles.postButton}>Read More</button>
        </div>
      </div>
    </div>
  );
}

export default Featured