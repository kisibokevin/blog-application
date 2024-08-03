'use client'
import styles from './comments.module.css'
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr'
import { useSession } from 'next-auth/react';
import { useState } from 'react'

const fetcher = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    //console.log(data);

    if(!res.ok){
        const error = new Error(data.message);
        throw error;
    }

    return data;
}

const Comments = ({ postSlug }) => {

    const {status} = useSession();

    const { data, mutate, isLoading } = useSWR(`http://localhost:3000/api/comments?postSlug=${postSlug}`, fetcher);

    const [desc, setDesc] = useState("");

    const handleSubmit = async () => {
        await fetch("/api/comments",{
            method: "POST",
            body: JSON.stringify({desc, postSlug})
        });
        mutate();
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Comments</h1>
            {status === 'authenticated' ? (
                <div className={styles.commentsForm}>
                    <textarea
                        placeholder="Write a Message..."
                        className={styles.textArea}
                        onChange={e=>setDesc(e.target.value)}
                    />
                    <button className={styles.button} onClick={handleSubmit}>Send</button>
                </div>
            ) : (
                <Link href="/login" className={styles.link}>Login to comment</Link>
            )}

            <div className={styles.commentsContainer}>

                {isLoading 
                    ? "  Loading...." 
                    : data.map((comment) => (
                        <div className={styles.comment} key={comment._id}>
                            <div className={styles.user}>
                                <div className={styles.userImageContainer}>
                                    {comment.user?.image && 
                                        <Image
                                            src={comment.user?.image}
                                            alt=""
                                            width={35}
                                            height={35}
                                            className={styles.avatar}
                                        />
                                    }
                                </div>
                                <div className={styles.userTextContainer}>
                                    <span className={styles.username}>{comment.user?.name}</span>
                                    <span className={styles.date}>{comment.createdAt.substring(0, 10)}</span>
                                </div>
                            </div>
                            <p className={styles.commentText}>
                                {comment.desc}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Comments