'use client'
import React from 'react'
import styles from './pagination.module.css'
import { useRouter } from 'next/navigation';

const Pagination = ({page, hasPrev, hasNext}) => {

  const router = useRouter();

  const handleNext = () => {
    router.push(`/?page=${page + 1}`);
  };

  const handlePrev = () => {
    router.push(`/?page=${page - 1}`);
  };

  //if (page === 1) {
  //  return null;
  // }
  
  return (
    <div className={styles.container}>
      <button className={styles.button} disabled={!hasPrev} onClick={handlePrev}>Prev</button>
      <button className={styles.button} disabled={!hasNext} onClick={handleNext}>Next</button>
    </div>
  );
}

export default Pagination