import React from 'react'
import styles from './cardlist.module.css'
import Pagination from '@/components/pagination/Pagination'
import Card from '@/components/card/Card'


const getData = async (page,cat) => {
  const res = await fetch(`http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`, {
    cache: "no-store",
  });

  if(!res.ok){
    throw new Error("Failed to fetch data")
  }

  return res.json();
}

const CardList = async ({ page, cat }) => {
  const {posts,count} = await getData(page, cat);

  const POSTS_PER_PAGE =  4;

  const hasPrev = POSTS_PER_PAGE * (page - 1) > 0;
  const hasNext = POSTS_PER_PAGE * (page - 1) + POSTS_PER_PAGE < count;


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
      { posts?.map((post) => (
        <Card post={post} key={post._id}/> 
      ))} 
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext}/>
    </div>
  );
};

export default CardList