'use client'

import React from 'react'
import styles from './login.module.css'
import Link from 'next/link';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'

const Login = () => {

    const { data, status } = useSession();
    const router = useRouter();

    console.log(data, status);


    if (status === 'loading'){
        return<div>Loading....</div>
    }

    if (status === 'authenticated'){
        router.push('/')
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Welcome</h1>
                <p>Please enter login details below</p>
                <div className={styles.loginForm}>
                    <input className={styles.input} type="text" placeholder="Email" />
                    <input className={styles.input} type="Password" placeholder='Password' />
                    <Link href='./reset' className={styles.forgot}>Forgot Password?</Link>
                    <button className={styles.button}>Sign In</button>
                </div>
                <p className={styles.or}>or</p>
                <div className={styles.socialLogins}>
                    <button onClick={() => signIn('google')} className={styles.socialButton}>
                        <Image src='/googleIcon.png' alt='' width={24} height={24} className={styles.authIcons} />
                        <span>Login in with Google</span>
                    </button>
                    <button className={styles.socialButton}>
                        <Image src='/githubIcon.png' alt='' width={24} height={24} className={styles.authIcons} />
                        <span>Login in with Github</span>
                    </button>
                    <button className={styles.socialButton}>
                        <Image src='/facebookIcon.png' alt='' width={24} height={24} className={styles.authIcons} />
                        <span>Login in with Facebook</span>
                    </button>
                </div>
                <p className={styles.noAccount}>Dont have an account? <span><Link href='./signup' className={styles.signUp}>Sign Up</Link></span></p>
            </div>
        </div>
    );
}

export default Login