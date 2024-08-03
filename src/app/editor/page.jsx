'use client'
import React, { useState, useEffect } from 'react'
import styles from './editor.module.css';
//import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import slugify from '@/utils/generateSlug';
import { RiAddLine } from '@remixicon/react';
import parse from 'html-react-parser'
import { app } from '@/utils/firebase';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Editor = () => {
    const { status, data: session } = useSession();
    const router = useRouter();

    const [file, setFile] = useState(null);
    const [ title, setTitle ] = useState("");
    const [ slug, setSlug ] = useState("");
    const [ category, setCategory ] = useState("")
    const [ desc, setDesc ] = useState("");
    const [ media, setMedia ] = useState("");
    const [ value, setValue ] = useState("")


    
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

    const handleTitle = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        const autoSlug = slugify(newTitle);
        setSlug(autoSlug);
    };

    const handleChange = (content) => {
        setValue(content);
    }
    
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

    //Custom Tool Bar
    const modules = {
        toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "color", "image"],
        [{ "code-block": true }],
        ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "indent",
        "image",
        "code-block",
        "color",
    ];

    if (status === 'loading') {
        return <div>Loading....</div>;
    }

    if (status === 'unauthenticated') {
        router.push('/');
    }

    return (
        <div className={styles.container}>
            <div className={styles.blogEditor}>
                <h1 className={styles.title}>Blog Editor</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor='title'>Title</label>
                            <input 
                                id='title' 
                                className={styles.input} 
                                type="text" 
                                placeholder='Title..' 
                                value={title} 
                                onChange={handleTitle}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor='slug'>Slug</label>
                            <input 
                                id='slug' 
                                className={styles.input} 
                                type="text" 
                                placeholder='Slug..' 
                                value={slug} 
                                onChange={(e) => setSlug(e.target.value)} autoComplete="slug"
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor='image'>Category</label>
                            <input 
                                className={styles.input} 
                                type="text" 
                                id="category" 
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor='desc'>Desc</label>
                            <textarea 
                                id='desc' 
                                className={styles.input} 
                                type="text" 
                                placeholder='Description..'  
                                value={desc} 
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </div>
                        
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor='image'>Cover Image</label>
                            <input 
                                className={styles.input} 
                                type="file" 
                                id="image" 
                                onChange={(e) => setFile(e.target.files[0])} 
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor='content'>Content</label>
                            <ReactQuill 
                                theme="snow" 
                                value={value}
                                onChange={handleChange}
                                modules={modules}
                                formats={formats}
                            />
                        </div>
                        <button 
                            type='submit' 
                            className={styles.button}
                        >
                            <RiAddLine className={styles.add} /><span className={styles.btnText}>Create Blog Post</span></button>
                    </form>
            </div>
            <div className={styles.blogView}>
                <h1 className={styles.title}>Blog View</h1>
                <div className={styles.blogContent}>
                    <h2 className={styles.blogTitle}>{title}</h2>
                    <h3 className={styles.slug}>{slug}</h3>
                    <h3 className={styles.slug}>{category}</h3>
                    <p className={styles.desc}>{desc}</p>
                    {parse(value)}
                </div>
            </div>
        </div>
    )
}

export default Editor