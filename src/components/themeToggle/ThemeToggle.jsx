'use client'
import React, { useContext } from 'react'
import Image from 'next/image';
import styles from "./themetoggle.module.css";
import { ThemeContext } from '@/context/ThemeContext';

const ThemeToggle = () => {

  const { theme, toggle } = useContext(ThemeContext);

  return (
    <div
      className={styles.container}
      onClick={toggle}
      style={
        theme === "dark"
          ? { left: 1, background: "white" }
          : { right: 1, background: "#0f172a" }
      }
    >
      <Image src="/moon.png" alt="alt" width={16} height={16} />
      <div
        className={styles.slider}
        style={
          theme === "dark"
            ? { left: 1, background: "#0f172a" }
            : { right: 1, background: "white" }
        }
      ></div>
      <Image src="/sun.png" alt="alt" width={16} height={16} />
    </div>
  );
}

export default ThemeToggle