import React from 'react'
import styles from './card.module.css'
import Image  from 'next/image';
import Link from 'next/link';
import parse from 'html-react-parser'

const Card = ({ post}) => {
    const cleanDesc = post.desc.replace(/<p>|<\/p>/g, '');

    return (
        <div className={styles.container}>
            { post.img && (
                <div className={styles.imageContainer}>
                    <Image src={post.img} alt='' fill className={styles.image} />
                </div>
            )}
            <div className={styles.textContainer}>
                <div className={styles.detail}>
                    <span className={styles.date}>{post.createdAt.substring(0, 10)} -</span>
                    <span className={styles.category}>{post.catSlug}</span>
                </div>
                <Link href={`/posts/${post.slug}`}>
                    <h1 className={styles.postTitle}>{post.title}</h1>
                </Link>
                <p className={styles.postDesc}>
                {cleanDesc.substring(0, 40)}
                </p>
                <Link href={`/posts/${post.slug}`} className={styles.link}>Read More</Link>
            </div>
        </div>
    )
}

export default Card