import React from 'react';
import styles from './menu.module.css';
import MenuPosts from '@/components/menuPosts/MenuPosts';
import MenuCategories from '@/components/menuCategories/MenuCategories';

const Menu = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.subTitle}>{"whats hot"}</h2>
      <h1 className={styles.title}>most Popular</h1>
      <MenuPosts withImage={false} />

      <h2 className={styles.subTitle}>{"Discover by Topic"}</h2>
      <h1 className={styles.title}>Categories</h1>
      <MenuCategories/>

      <h2 className={styles.subTitle}>{"Chosen For You"}</h2>
      <h1 className={styles.title}>Editors Pick</h1>
      <MenuPosts withImage={true} />
    </div>
  );
}

export default Menu