'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import "react-quill/dist/quill.snow.css";
import styles from './write.module.css';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { app } from '@/utils/firebase';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });



const CreatePost = () => {
    const { status, data: session } = useSession();
    const router = useRouter();

    const [file, setFile] = useState(null);
    const [media, setMedia] = useState('');
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        const storage = getStorage(app);
            const upload = () => {
                const name = new Date().getTime() + file.name;
                const storageRef = ref(storage, name);

                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case "paused":
                            console.log("Upload is paused");
                            break;
                            case "running":
                            console.log("Upload is running");
                            break;
                        }
                    },
                    (error) => {
                        console.error(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setMedia(downloadURL);
                        });
                    }
                );
            };
            file && upload();
    }, [file]);

    if (status === 'loading') {
        return <div>Loading....</div>;
    }

    if (status === 'unauthenticated') {
        router.push('/');
    }

    const slugify = (str) =>
        str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title,
                desc: value,
                img: media,
                slug: slugify(title),
                catSlug: slugify(category),
                content: value,
            }),
        });
        console.log(res);
        if (res.ok) {
            router.push('/');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Create Post</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="title">
                        Post Title
                    </label>
                    <input
                        className={styles.input}
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="category">
                        Category
                    </label>
                    <input
                        className={styles.input}
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="image">
                        Image
                    </label>
                    <input className={styles.input} type="file" id="image" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <ReactQuill theme="snow" value={value} onChange={setValue} placeholder="Write your content here...." className={styles.editor} />
                <button className={styles.button} type="submit">
                    Publish
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
